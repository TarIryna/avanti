"use client";

import { createContext, useContext } from "react";
import { useCartManager } from "@/fetchActions/cart/useCartManager";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const cart = useCartManager(null);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCartStore = () => useContext(CartContext);
