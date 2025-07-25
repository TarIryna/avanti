export const getUniqueArray = (array1, array2) => {
  const merged = [...array1, ...array2];

  return Array.from(new Map(merged.map((item) => [item.code, item])).values());
};
