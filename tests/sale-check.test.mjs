import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const asModule = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const basePrice = asModule(await readFile(new URL('../src/utils/salePrice.js', import.meta.url), 'utf8'));
const source = await readFile(new URL('../src/utils/saleCheck.js', import.meta.url), 'utf8');
const { priceSaleItem, changeSaleClient, saleCheckTotal } = await import(asModule(source.replace("'./salePrice.js'", JSON.stringify(basePrice))));

const item = { code: '123456', price: 1000, salePrice: 1000, quantity: 2, size: [{ size: '36', q: 2 }] };

test('manual discount and its comment survive applying, replacing and removing a client', () => {
  const discounted = priceSaleItem({ ...item, comment: 'Display pair' }, null, 50.5);
  const original = { items: [discounted], client: null };
  const client10 = changeSaleClient(original, { phone: '111', discount: 10 });
  assert.equal(client10.items[0].salePrice, 849.5);
  assert.equal(client10.total, 1699);
  assert.equal(client10.items[0].comment, 'Display pair');
  const client20 = changeSaleClient(client10, { phone: '222', discount: 20 });
  assert.equal(client20.items[0].salePrice, 749.5);
  assert.equal(client20.total, 1499);
  const removed = changeSaleClient(client20, null);
  assert.equal(removed.items[0].salePrice, 949.5);
  assert.equal(removed.items[0].manualDiscount, 50.5);
  assert.equal(removed.items[0].comment, 'Display pair');
  assert.equal(original.items[0].salePrice, 949.5);
});

test('client discounts do not apply to sale products, manual discounts still apply', () => {
  const check = changeSaleClient({ client: null, items: [{ ...item, price2: 1200, manualDiscount: 100, salePrice: 900 }] }, { discount: 20 });
  assert.equal(check.items[0].salePrice, 900);
  assert.equal(check.total, 1800);
});

test('repeated application does not compound the discount and zero resets the manual amount', () => {
  const client = { discount: 10 };
  const check = changeSaleClient({ client: null, items: [priceSaleItem(item, null, 100)] }, client);
  assert.equal(changeSaleClient(check, client).total, 1600);
  assert.equal(priceSaleItem(check.items[0], client, 0).salePrice, 900);
});

test('legacy manual discounts are retained when the client changes', () => {
  const check = { client: { discount: 10 }, items: [{ ...item, salePrice: 850, comment: 'Legacy reason' }] };
  const result = changeSaleClient(check, { discount: 20 });
  assert.equal(result.items[0].manualDiscount, 50);
  assert.equal(result.items[0].salePrice, 750);
  assert.equal(result.items[0].comment, 'Legacy reason');
});

test('prices cannot become negative and receipt totals are rounded to cents', () => {
  assert.equal(priceSaleItem(item, null, 2000).salePrice, 0);
  assert.equal(saleCheckTotal([{ salePrice: 0.1, quantity: 1 }, { salePrice: 0.2, quantity: 1 }]), 0.3);
});

test('sale API saves the discount comment and recalculated client, price and terminal allocation', async () => {
  let saved;
  const document = {
    _id: 'product-id', sizes: [{ size: '36', q: 3 }], sizes_all: { 1: [{ size: '36', q: 3 }] },
    get(key) { return this[key]; }, markModified() {}, async save() {},
  };
  const check = changeSaleClient({ client: null, items: [priceSaleItem({ ...item, comment: 'Display pair' }, null, 50)] }, { phone: '111', discount: 10 });
  const constants = await import(asModule(await readFile(new URL('../src/constants/constants.js', import.meta.url), 'utf8')));
  const context = {
    ...constants, Response, console, connectToDB: async () => {},
    Product: { findOne: async () => document },
    Rate: { findOne: () => ({ sort: async () => ({ rate: 45 }) }) },
    Operation: { insertMany: async operations => { saved = operations; } },
  };
  vm.createContext(context);
  const route = await readFile(new URL('../src/app/api/shop/operation/new/route.js', import.meta.url), 'utf8');
  vm.runInContext(route.replace(/^import .*;\r?\n/gm, '').replace('export const POST', 'var POST'), context);
  const response = await context.POST({ json: async () => ({ ...check, terminal: 500, shop: 1, type: constants.OPERATION_TYPE.SALE }) });
  assert.equal(response.status, 201);
  assert.equal(saved[0].comment, 'Display pair');
  assert.equal(saved[0].clientPhone, '111');
  assert.equal(saved[0].salePrice, 850);
  assert.equal(saved[0].quantity, -2);
  assert.equal(saved[0].terminal, 250);
});
