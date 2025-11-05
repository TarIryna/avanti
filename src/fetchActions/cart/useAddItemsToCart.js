"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddItemsToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ localItems, userId }) => {
      if (!Array.isArray(localItems) || localItems.length === 0) return [];

      const res = await fetch("/api/cart/add-many", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: localItems, userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to add items to cart");
      }

      const data = await res.json();
      return data.items; // возвращаем массив добавленных товаров
    },
    onSuccess: (data, variables) => {
      const { userId } = variables;
      // инвалидируем кэш корзины для этого пользователя
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: (error) => {
      console.error("Ошибка добавления товаров в корзину:", error);
    },
  });
};



