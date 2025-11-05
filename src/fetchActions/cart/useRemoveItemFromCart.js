"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useRemoveItemFromCart = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, size }) => {
      const response = await fetch("/api/cart/remove-item", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creator: userId,
          productId: productId,
          size,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Ошибка при удалении товара");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Товар успешно удален из корзины!");
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: (error) => {
      console.error("Ошибка при удалении товара из корзины", error);
      toast.error(error.message || "Не удалось удалить товар");
    },
  });
};
