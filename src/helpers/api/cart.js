// helpers/api/cart.js
export const fetchServerCartAPI = async (userId) => {
  try {
    const url = userId ? `/api/cart?userId=${userId}` : `/api/cart`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch server cart");
    const data = await res.json();
    // предположим, что сервер возвращает массив заказов
    return Array.isArray(data) ? data : data.items || [];
  } catch (err) {
    console.error("fetchServerCartAPI error:", err);
    return [];
  }
};

export const addItemsToServerCartAPI = async (items, userId) => {
  try {
    const url = userId ? `/api/cart/add-many?userId=${userId}` : `/api/cart`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error("Failed to add items to server cart");
    const data = await res.json();
    return Array.isArray(data) ? data : data.items || [];
  } catch (err) {
    console.error("addItemsToServerCartAPI error:", err);
    return [];
  }
};
