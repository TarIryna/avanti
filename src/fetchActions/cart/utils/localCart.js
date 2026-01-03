const CART_KEY = 'cart';

// Получить корзину из localStorage
export const getLocalCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
};

// Записать корзину
export const setLocalCart = (items) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

// Добавить товар (без мутаций)
export const addLocalItem = (item) => {
  const cart = getLocalCart();

  const existing = cart.find(
    (i) => i.product === item.product && i.size === item.size
  );

  let updated;

  if (existing) {
    updated = cart.map((i) =>
      i.product === item.product && i.size === item.size
        ? { ...i, quantity: i.quantity + item.quantity }
        : i
    );
  } else {
    updated = [...cart, { ...item }];
  }

  setLocalCart(updated);
  return updated;
};

export const changeLocalItemQuantity = (item) => {
  const cart = getLocalCart();

  const updated = cart.map((i) =>
    i.product === item.product && i.size === item.size
      ? { ...i, quantity: item.quantity } // ← заменяем, а не прибавляем
      : i
  );

  setLocalCart(updated);
  return updated;
};




export const removeLocalItem = (data) => {
  const cart = getLocalCart();
  const { productId, size } = data



  const updated = cart.filter(
    (i) => !(i.product === productId && i.size === size)
  );
  setLocalCart(updated);
  return updated;  // новый массив
};

export const clearLocalCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cart"); 
};