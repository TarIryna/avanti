import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const load = async path => {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
};
const helpers = await load('../src/helpers/redirectReport.js');
const { buildRedirectReport, getRedirectReportRange } = helpers;
const { groupRedirectReportRows } = helpers;
const { getSeasonPriorityByDate } = await load('../src/helpers/getSortParam.js');
const product = (one, two, three) => ({
  code: '123456', season: 1, sizes_all: Object.fromEntries([one, two, three].map((q, i) => [i + 1, [{ size: '36', q }]])),
});

test('groups all recommended sizes by product without merging different product codes', () => {
  const item = product(0, 2, 0);
  item.sizes_all[2].push({ size: '37', q: 3 });
  const rows = buildRedirectReport([item, { ...product(0, 1, 0), code: '654321' }]);
  const snapshot = structuredClone(rows);
  const grouped = groupRedirectReportRows(rows);
  assert.equal(grouped.length, 2);
  assert.deepEqual(grouped[0].recommendations.map(item => item.size), ['36', '37']);
  assert.deepEqual(grouped[0].transfers, [
    { size: '36', from: 2, to: 1, quantity: 1 },
    { size: '37', from: 2, to: 1, quantity: 1 },
  ]);
  assert.equal(grouped[1].recommendations.length, 1);
  assert.deepEqual(rows, snapshot);
});

test('A2 supplies one missing pair to the leading shop A1', () => {
  const result = buildRedirectReport([product(0, 3, 0)]);
  assert.deepEqual(result[0].transfers, [{ from: 2, to: 1, quantity: 1 }]);
  assert.equal(result[0].shop2, 3);
  assert.deepEqual(buildRedirectReport([product(1, 0, 0)]), []);
});

test('warehouse supplies missing shops and allocates its last pair to A1', () => {
  assert.deepEqual(buildRedirectReport([product(0, 3, 1)])[0].transfers, [{ from: 3, to: 1, quantity: 1 }]);
  assert.deepEqual(buildRedirectReport([product(0, 0, 1)])[0].transfers, [{ from: 3, to: 1, quantity: 1 }]);
  assert.deepEqual(buildRedirectReport([product(0, 0, 2)])[0].transfers, [
    { from: 3, to: 1, quantity: 1 }, { from: 3, to: 2, quantity: 1 },
  ]);
  assert.deepEqual(buildRedirectReport([product(2, 0, 1)])[0].transfers, [{ from: 3, to: 2, quantity: 1 }]);
});

test('A1 supplies A2 from surplus only when the warehouse cannot supply it', () => {
  assert.deepEqual(buildRedirectReport([product(2, 0, 0)])[0].transfers, [{ from: 1, to: 2, quantity: 1 }]);
  assert.deepEqual(buildRedirectReport([product(1, 0, 0)]), []);
  assert.deepEqual(buildRedirectReport([product(2, 1, 0)]), []);
  assert.deepEqual(buildRedirectReport([product(2, 0, 1)])[0].transfers, [{ from: 3, to: 2, quantity: 1 }]);
  const item = product(2, 0, 0);
  item.sizes_all[1][0].isDefect = 1;
  assert.deepEqual(buildRedirectReport([item]), []);
});

test('children clothing and shoes stay in A1 even when it has surplus', () => {
  for (const gender of [3, 4, '3', '4']) {
    assert.deepEqual(buildRedirectReport([{ ...product(3, 0, 0), gender }]), []);
  }
  for (const gender of [1, 2]) {
    assert.deepEqual(buildRedirectReport([{ ...product(3, 0, 0), gender }])[0].transfers,
      [{ from: 1, to: 2, quantity: 1 }]);
  }
});

test('A2 supplies A1 when the warehouse only has defective pairs', () => {
  const item = product(0, 2, 1);
  item.sizes_all[3][0].isDefect = 1;
  assert.deepEqual(buildRedirectReport([item])[0].transfers, [{ from: 2, to: 1, quantity: 1 }]);
});

test('defective pairs cannot be proposed for transfer', () => {
  const item = product(0, 2, 1);
  item.sizes_all[2][0].isDefect = 2;
  item.sizes_all[3][0].isDefect = 1;
  assert.deepEqual(buildRedirectReport([item]), []);
  item.sizes_all[2][0].isDefect = 1;
  assert.equal(buildRedirectReport([item])[0].shop2, 1);
});

test('missing target sizes count as zero; operation candidates limit exact product and size', () => {
  const item = product(0, 1, 0);
  item.sizes_all[1] = [];
  item.sizes_all[2].push({ size: '37', q: 2 });
  assert.equal(buildRedirectReport([item]).length, 2);
  assert.equal(buildRedirectReport([item], new Map([['123456', new Set(['36'])]])).length, 1);
  assert.deepEqual(buildRedirectReport([item], new Map([['999999', new Set(['36'])]])), []);
});

test('healthy stocked shops and empty sources produce no suggestions; inputs stay unchanged', () => {
  const products = [product(1, 1, 5), product(0, 0, 0)];
  const snapshot = structuredClone(products);
  assert.deepEqual(buildRedirectReport(products), []);
  assert.deepEqual(products, snapshot);
});

test('report includes every size in all three shops, even outside operation candidates', () => {
  const item = product(0, 1, 0);
  item.sizes_all[1].push({ size: '38', q: 2, isDefect: 1 });
  item.sizes_all[3].push({ size: '37', q: 3 });
  const [row] = buildRedirectReport([item], new Map([['123456', new Set(['36'])]]));
  assert.deepEqual(row.allSizes.map(stock => stock.shop), [1, 2, 3]);
  assert.deepEqual(row.allSizes[0].sizes, [
    { size: '36', q: 0, isDefect: 0, available: 0 },
    { size: '37', q: 0, isDefect: 0, available: 0 },
    { size: '38', q: 2, isDefect: 1, available: 1 },
  ]);
  assert.equal(row.allSizes[2].sizes[1].q, 3);
});

test('Kyiv date ranges include the final day and support daylight-saving changes', () => {
  const now = new Date('2026-11-16T10:30:00Z');
  let range = getRedirectReportRange('2026-11-15', '', now);
  assert.equal(range.start.toISOString(), '2026-11-14T22:00:00.000Z');
  assert.equal(range.end.toISOString(), now.toISOString());
  range = getRedirectReportRange('2026-03-29', '2026-03-29', now);
  assert.equal(range.start.toISOString(), '2026-03-28T22:00:00.000Z');
  assert.equal(range.end.toISOString(), '2026-03-29T21:00:00.000Z');
  range = getRedirectReportRange('2026-10-25', '2026-10-25', now);
  assert.equal(range.start.toISOString(), '2026-10-24T21:00:00.000Z');
  assert.equal(range.end.toISOString(), '2026-10-25T22:00:00.000Z');
});

test('invalid, reversed, and future date ranges are rejected', () => {
  const now = new Date('2026-11-16T10:30:00Z');
  for (const [from, to] of [['', ''], ['2026-02-30', ''], ['2026-11-17', ''], ['2026-11-15', '2026-11-14'], ['2026-11-15', '2026-11-17']]) {
    assert.throws(() => getRedirectReportRange(from, to, now));
  }
});

test('season selection uses the Kyiv month and all configured priority seasons', () => {
  assert.deepEqual(getSeasonPriorityByDate(new Date('2026-10-31T23:00:00Z')), [1, 3, 14]);
  assert.deepEqual(getSeasonPriorityByDate(new Date('2026-06-15T00:00:00Z')), [2, 16, 17, 14, 18]);
});

test('API scopes operations by shop, stock-reducing type, date and exact sizes', async () => {
  let operationQuery, productQuery;
  const context = {
    ...helpers, getSeasonPriorityByDate, Response, URL, console,
    OPERATION_TYPE: { SALE: 1, DECREASE: 4, TRANSIT: 5 },
    connectToDB: async () => {},
    Operation: { find: query => {
      operationQuery = query;
      return { select: () => ({ lean: async () => [{ code: 123456, size: [{ size: '36', q: 1 }] }] }) };
    } },
    Product: { find: query => {
      productQuery = query;
      return { select: () => ({ sort: () => ({ lean: async () => [product(0, 1, 0)] }) }) };
    } },
  };
  vm.createContext(context);
  const route = await readFile(new URL('../src/app/api/shop/redirect-report/route.js', import.meta.url), 'utf8');
  vm.runInContext(route.replace(/^import .*;\r?\n/gm, '').replaceAll('export const ', 'var '), context);
  const response = await context.GET({ url: 'https://example.test/api?mode=operations&from=2020-01-01&to=2020-01-02' });
  assert.equal(response.status, 200);
  const report = await response.json();
  assert.equal(report.rows.length, 1);
  assert.equal(report.totalPairs, 1);
  assert.deepEqual(Array.from(operationQuery.shop.$in), [1, 2]);
  assert.deepEqual(Array.from(operationQuery.type.$in), [1, 4, 5]);
  assert.equal(operationQuery.createdAt.$lt.toISOString(), '2020-01-02T22:00:00.000Z');
  assert.deepEqual(Array.from(productQuery.code.$in), ['123456']);
  const stock = await context.GET({ url: 'https://example.test/api?mode=stock' });
  const stockReport = await stock.json();
  assert.equal(stock.status, 200);
  assert.deepEqual(Array.from(productQuery.season.$in), stockReport.seasons);
  assert.equal(productQuery.code, undefined);
  const shop2 = await context.GET({ url: 'https://example.test/api?mode=stock&shop=2' });
  const shop2Report = await shop2.json();
  assert.equal(shop2Report.rows.length, 1);
  assert.equal(shop2Report.totalPairs, 1);
  assert.ok(shop2Report.rows.every(row => row.transfers.every(item => item.from === 2)));
  for (const mode of ['stock', 'operations&from=2020-01-01&to=2020-01-02']) {
    const response = await context.GET({ url: `https://example.test/api?mode=${mode}&shop=3` });
    const report = await response.json();
    assert.deepEqual(report.rows, []);
    assert.equal(report.totalPairs, 0);
  }
  context.Product.find = () => ({ select: () => ({ sort: () => ({ lean: async () => [product(0, 1, 1)] }) }) });
  for (const mode of ['stock', 'operations&from=2020-01-01&to=2020-01-02']) {
    const filtered = await context.GET({ url: `https://example.test/api?mode=${mode}&shop=2` });
    const filteredReport = await filtered.json();
    assert.deepEqual(filteredReport.rows, []);
    assert.equal(filteredReport.totalPairs, 0);
  }
  const shop1 = await context.GET({ url: 'https://example.test/api?mode=stock&shop=1' });
  assert.deepEqual((await shop1.json()).rows, []);
  context.Product.find = () => ({ select: () => ({ sort: () => ({ lean: async () => [product(2, 0, 0)] }) }) });
  for (const mode of ['stock', 'operations&from=2020-01-01&to=2020-01-02']) {
    const response = await context.GET({ url: `https://example.test/api?mode=${mode}&shop=1` });
    const report = await response.json();
    assert.equal(report.totalPairs, 1);
    assert.deepEqual(report.rows[0].transfers, [{ from: 1, to: 2, quantity: 1 }]);
  }
  context.Product.find = () => ({ select: () => ({ sort: () => ({ lean: async () => [product(0, 0, 2)] }) }) });
  for (const mode of ['stock', 'operations&from=2020-01-01&to=2020-01-02']) {
    const response = await context.GET({ url: `https://example.test/api?mode=${mode}&shop=3` });
    const report = await response.json();
    assert.equal(report.rows.length, 1);
    assert.equal(report.totalPairs, 2);
    assert.deepEqual(report.rows[0].transfers, [
      { from: 3, to: 1, quantity: 1 }, { from: 3, to: 2, quantity: 1 },
    ]);
  }
  assert.equal((await context.GET({ url: 'https://example.test/api?mode=unknown' })).status, 400);
  assert.equal((await context.GET({ url: 'https://example.test/api?mode=operations&from=invalid' })).status, 400);
});
