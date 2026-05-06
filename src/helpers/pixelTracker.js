export const trackAddToCart = (product) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", {
      content_ids: [product.id], // ID товара
      content_name: product.name, // Название
      content_type: "product",
      value: product.price, // Цена
      currency: "UAH", // Валюта
    });
  }
};