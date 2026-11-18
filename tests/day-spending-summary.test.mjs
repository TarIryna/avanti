import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/helpers/daySpendingSummary.js', import.meta.url), 'utf8');
const { daySpendingSummary } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('groups hours by employee and separates all non-work expenses', () => {
  const rows = [
    { type: 13, staff: 1, hours: 4, amount: 999 },
    { type: '13', staff: '1', hours: 5 },
    { type: 13, staff: 2, hours: 8 },
    { type: 2, staff: 1, amount: 100, comment: 'Supplies' },
    { type: 1, staff: 2, amount: 250 },
  ];
  const result = daySpendingSummary(rows);
  assert.deepEqual(result.workers, [{ staff: 1, hours: 9 }, { staff: 2, hours: 8 }]);
  assert.deepEqual(result.expenses, rows.slice(3));
  assert.equal(result.expenses[0].comment, 'Supplies');
  assert.equal(result.totalExpenses, 350);
  assert.equal(rows[0].hours, 4);
});

test('legacy work records with no hours remain distinguishable from zero', () => {
  const result = daySpendingSummary([{ type: 13, staff: 1 }, { type: 13, staff: null }]);
  assert.deepEqual(result.workers, [{ staff: 1, hours: null }, { staff: null, hours: null }]);
  assert.equal(result.totalExpenses, 0);
});

test('handles empty reports and decimal monetary totals', () => {
  assert.deepEqual(daySpendingSummary(), { workers: [], expenses: [], totalExpenses: 0 });
  assert.equal(daySpendingSummary([{ amount: 0.1 }, { amount: 0.2 }]).totalExpenses, 0.3);
});
