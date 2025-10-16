export const mergeUniqueItems = (arr1, arr2) => {
  const map = new Map();

  [...arr1, ...arr2].forEach((item) => {
    map.set(item.id, item); // используем уникальный ключ, например item.id
  });

  return Array.from(map.values());
};

export const getNewOrder = (data) => {
  const items = [];
  data.split(";").map((item) => {
    const obj = {};
    item.split(",").forEach((pair) => {
      const [key, value] = pair.split("=");
      obj[key] = value === "undefined" ? "" : value;
    });
    items.push(obj);
  });
  return items;
};
