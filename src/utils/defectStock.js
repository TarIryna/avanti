// isDefect counts defective pairs included in q.
export const validateDefectStock = (stock) => {
  if (!stock || typeof stock !== 'object' || Array.isArray(stock)) return 'Некоректні залишки';
  for (const sizes of Object.values(stock)) {
    if (!Array.isArray(sizes)) return 'Некоректні розміри магазину';
    for (const item of sizes) {
      const q = Number(item?.q);
      const defects = item?.isDefect ?? 0;
      if (!Number.isInteger(q) || q < 0 || !Number.isInteger(defects) || defects < 0 || defects > q) {
        return 'Кількість браку має бути цілим числом від 0 до залишку розміру';
      }
    }
  }
  return null;
};

export const applyDefectStockChange = (sizes, previousStock, nextStock) => {
  const changes = new Map();
  for (const [stock, sign] of [[previousStock, 1], [nextStock, -1]]) {
    for (const entries of Object.values(stock || {})) {
      if (!Array.isArray(entries)) continue;
      for (const item of entries) {
        const key = String(item.size);
        changes.set(key, (changes.get(key) || 0) + sign * (Number(item.isDefect) || 0));
      }
    }
  }
  const result = sizes.map(item => ({ size: item.size, q: Number(item.q) || 0 }));
  for (const [size, difference] of changes) {
    if (!difference) continue;
    const item = result.find(item => String(item.size) === size);
    if (item) item.q = Math.max(0, item.q + difference);
    else if (difference > 0) result.push({ size, q: difference });
  }
  return result;
};
