const availableBySize = (entries = []) => {
  const result = new Map();
  for (const item of entries) {
    const size = String(item.size);
    const quantity = Math.max(0, (Number(item.q) || 0) - (Number(item.isDefect) || 0));
    result.set(size, (result.get(size) || 0) + quantity);
  }
  return result;
};

// Each recommendation fills one missing size. Warehouse stock is allocated to A1 first.
export const buildRedirectReport = (products, candidates = null) => {
  const rows = [];
  for (const product of products) {
    const allowedSizes = candidates?.get(String(product.code));
    if (candidates && !allowedSizes) continue;
    const stock = [1, 2, 3].map(shop => availableBySize(product.sizes_all?.[String(shop)] || []));
    const sizes = new Set(stock.flatMap(items => [...items.keys()]));
    const sortedSizes = [...sizes].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const allSizes = [1, 2, 3].map((shop, index) => ({
      shop,
      sizes: sortedSizes.map(size => {
        const entries = (product.sizes_all?.[String(shop)] || []).filter(item => String(item.size) === size);
        return {
          size,
          q: entries.reduce((sum, item) => sum + (Number(item.q) || 0), 0),
          isDefect: entries.reduce((sum, item) => sum + (Number(item.isDefect) || 0), 0),
          available: stock[index].get(size) || 0,
        };
      }),
    }));
    for (const size of sortedSizes) {
      if (allowedSizes && !allowedSizes.has(size)) continue;
      const [shop1, shop2, shop3] = stock.map(items => items.get(size) || 0);
      let warehouse = shop3;
      const transfers = [];
      if (shop1 === 0) {
        if (warehouse > 0) {
          transfers.push({ from: 3, to: 1, quantity: 1 });
          warehouse -= 1;
        } else if (shop2 > 0) transfers.push({ from: 2, to: 1, quantity: 1 });
      }
      if (shop2 === 0) {
        if (warehouse > 0) transfers.push({ from: 3, to: 2, quantity: 1 });
        else if (shop1 > 1 && ![3, 4].includes(Number(product.gender))) {
          transfers.push({ from: 1, to: 2, quantity: 1 });
        }
      }
      if (!transfers.length) continue;
      rows.push({
        code: product.code,
        model: product.model || '',
        vendor: product.vendor,
        season: product.season,
        image: product.small_image || product.images?.[0] || '',
        size, shop1, shop2, shop3, transfers, allSizes,
      });
    }
  }
  return rows;
};

export const groupRedirectReportRows = (rows) => {
  const products = new Map();
  for (const row of rows) {
    const key = String(row.code);
    if (!products.has(key)) products.set(key, { ...row, recommendations: [], transfers: [] });
    const product = products.get(key);
    product.recommendations.push({ size: row.size, shop1: row.shop1, shop2: row.shop2, shop3: row.shop3 });
    product.transfers.push(...row.transfers.map(transfer => ({ ...transfer, size: row.size })));
  }
  return [...products.values()];
};

const kyivDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Kyiv', year: 'numeric', month: '2-digit', day: '2-digit',
});

export const getKyivDateKey = (date = new Date()) => {
  const parts = Object.fromEntries(kyivDate.formatToParts(date).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};

const dateAtKyivMidnight = (key) => {
  const wallTime = Date.parse(`${key}T00:00:00.000Z`);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(wallTime));
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return new Date(wallTime - (Number(values.hour) * 60 + Number(values.minute)) * 60000);
};

export const getRedirectReportRange = (from, to, now = new Date()) => {
  const validDate = key => /^\d{4}-\d{2}-\d{2}$/.test(key || '') &&
    Number.isFinite(Date.parse(`${key}T00:00:00Z`)) &&
    new Date(`${key}T00:00:00Z`).toISOString().slice(0, 10) === key;
  if (!validDate(from) || (to && !validDate(to))) throw new Error('Вкажіть коректні дати');
  const today = getKyivDateKey(now);
  if (from > today || (to && (to < from || to > today))) throw new Error('Некоректний період звіту');
  let end = now;
  if (to && to < today) {
    const nextDay = new Date(`${to}T00:00:00Z`);
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    end = dateAtKyivMidnight(nextDay.toISOString().slice(0, 10));
  }
  return { start: dateAtKyivMidnight(from), end };
};
