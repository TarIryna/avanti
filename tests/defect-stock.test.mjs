import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/utils/defectStock.js', import.meta.url), 'utf8');
const { applyDefectStockChange, validateDefectStock } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('marking defects keeps physical stock and subtracts only defective pairs online', () => {
  const previous = { 1: [{ size: '36', q: 2 }], 2: [{ size: '36', q: 3 }] };
  const next = { ...previous, 1: [{ size: '36', q: 2, isDefect: 1 }] };
  const online = [{ size: '36', q: 5 }, { size: '37', q: 2 }];
  assert.deepEqual(applyDefectStockChange(online, previous, next), [{ size: '36', q: 4 }, { size: '37', q: 2 }]);
  assert.equal(next[1][0].q, 2);
  assert.equal(online[0].q, 5);
});

test('saving unchanged defects does not subtract again', () => {
  const stock = { 1: [{ size: '36', q: 2, isDefect: 1 }] };
  assert.deepEqual(applyDefectStockChange([{ size: '36', q: 1 }], stock, stock), [{ size: '36', q: 1 }]);
});

test('removing defects restores availability including a missing online size', () => {
  const previous = { 1: [{ size: '36', q: 2, isDefect: 2 }] };
  const next = { 1: [{ size: '36', q: 2, isDefect: 0 }] };
  assert.deepEqual(applyDefectStockChange([], previous, next), [{ size: '36', q: 2 }]);
});

test('defects in multiple shops combine, online availability cannot become negative', () => {
  const next = { 1: [{ size: '36', q: 2, isDefect: 1 }], 2: [{ size: '36', q: 2, isDefect: 2 }] };
  assert.deepEqual(applyDefectStockChange([{ size: '36', q: 4 }], {}, next), [{ size: '36', q: 1 }]);
  assert.deepEqual(applyDefectStockChange([{ size: '36', q: 1 }], {}, next), [{ size: '36', q: 0 }]);
});

test('validates optional defect count and rejects invalid quantities', () => {
  assert.equal(validateDefectStock({ 1: [{ size: '36', q: 2 }] }), null);
  assert.equal(validateDefectStock({ 1: [{ size: '36', q: 2, isDefect: 2 }] }), null);
  for (const defects of [-1, 3, 0.5, '1', true]) {
    assert.ok(validateDefectStock({ 1: [{ size: '36', q: 2, isDefect: defects }] }));
  }
  for (const stock of [null, [], { 1: null }, { 1: [{ size: '36', q: -1 }] }]) {
    assert.ok(validateDefectStock(stock));
  }
});
