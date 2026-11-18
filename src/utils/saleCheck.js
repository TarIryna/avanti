import { salePrice } from './salePrice.js';

const roundMoney = amount => Math.round(amount * 100) / 100;

export const priceSaleItem = (item, client, discount = item.manualDiscount || 0) => ({
  ...item,
  manualDiscount: Math.max(0, Number(discount) || 0),
  salePrice: Math.max(0, roundMoney(Number(salePrice(item, client)) - (Number(discount) || 0))),
});

export const saleCheckTotal = items => roundMoney(items.reduce(
  (sum, item) => sum + Number(item.salePrice) * (item.quantity || 1), 0,
));

export const changeSaleClient = (check, client) => {
  const items = check.items.map(item => {
    // Retain manual discounts from receipts created before manualDiscount was introduced.
    const discount = item.manualDiscount ?? Math.max(0,
      roundMoney(Number(salePrice(item, check.client)) - Number(item.salePrice)),
    );
    return priceSaleItem(item, client, discount);
  });
  return { ...check, client, items, total: saleCheckTotal(items) };
};
