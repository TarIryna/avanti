import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../src/utils/workHours.js', import.meta.url), 'utf8');
const { calculateWorkHours } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('calculates whole work hours including end-of-day midnight', () => {
  assert.equal(calculateWorkHours(9, 18), 9);
  assert.equal(calculateWorkHours('10', '19'), 9);
  assert.equal(calculateWorkHours(0, 24), 24);
  assert.equal(calculateWorkHours(23, 24), 1);
});

test('rejects empty, fractional, reversed and out-of-range hours', () => {
  for (const [start, end] of [['', '18'], [9, ''], [null, 18], [9.5, 18], [9, 18.5], [-1, 18], [24, 24], [9, 25], [18, 9], [9, 9], ['x', 18]]) {
    assert.equal(calculateWorkHours(start, end), null);
  }
});

test('spending API computes hours, ignores client totals and preserves monetary expenses', async () => {
  let saved, connections = 0;
  const context = {
    Response, URL, console, calculateWorkHours,
    connectToDB: async () => { connections++; },
    Spending: { create: async value => { saved = value; } },
  };
  vm.createContext(context);
  const route = await readFile(new URL('../src/app/api/shop/spending/route.js', import.meta.url), 'utf8');
  vm.runInContext(route.replace(/^import .*;\r?\n/gm, '').replaceAll('export const ', 'var '), context);
  const send = data => context.POST({ json: async () => data });
  assert.equal((await send({ staff: 2, shop: 1, type: 13, startHour: 9, endHour: 18, hours: 999, amount: 500, comment: 'ignored' })).status, 200);
  assert.deepEqual(JSON.parse(JSON.stringify(saved)), { staff: 2, shop: 1, type: 13, hours: 9 });
  const previousConnections = connections;
  assert.equal((await send({ staff: 2, shop: 1, type: 13, startHour: 9.5, endHour: 18 })).status, 400);
  assert.equal((await send({ staff: null, shop: 1, type: 13, startHour: 9, endHour: 18 })).status, 400);
  assert.equal((await send({ staff: 2, type: 13, startHour: 9, endHour: 18 })).status, 400);
  assert.equal(connections, previousConnections);
  assert.equal((await send({ staff: 2, shop: 1, type: 1, amount: 500, comment: 'advance' })).status, 200);
  assert.equal(saved.amount, 500);
  assert.equal(saved.comment, 'advance');
  assert.equal(saved.hours, undefined);
});
