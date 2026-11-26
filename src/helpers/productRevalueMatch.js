const parseCount = (value) => {
  if (value == null || value === "") return undefined;
  if (typeof value !== "number" && !(typeof value === "string" && /^\d+$/.test(value))) return NaN;
  const count = Number(value);
  return Number.isSafeInteger(count) && count >= 0 ? count : NaN;
};

export const getProductPairCountMatch = ({ totalCount, pop } = {}) => {
  const stock = parseCount(totalCount);
  const sold = parseCount(pop);
  if (Number.isNaN(stock) || Number.isNaN(sold)) return null;

  const match = {};
  if (sold !== undefined) match.pop = sold === 0 ? { $in: [0, null] } : sold;
  if (stock === undefined) return match;

  // Operations update per-location totals. Older products may only have totalCount.
  match.$expr = {
    $eq: [
      {
        $cond: [
          { $and: [{ $isArray: "$total" }, { $ne: ["$total", []] }] },
          {
            $sum: {
              $map: {
                input: "$total",
                as: "location",
                in: { $convert: { input: "$$location.q", to: "double", onError: 0, onNull: 0 } },
              },
            },
          },
          "$totalCount",
        ],
      },
      stock,
    ],
  };
  return match;
};

export const getProductCodeMatch = (value) => {
  if (value == null) return {};
  if (typeof value !== "string") return null;
  const barcode = value.trim();
  if (!barcode) return {};

  const code = /^\d+$/.test(barcode) ? Number(barcode) : NaN;
  return Number.isSafeInteger(code)
    ? { $or: [{ code }, { barcodes: barcode }] }
    : { barcodes: barcode };
};
