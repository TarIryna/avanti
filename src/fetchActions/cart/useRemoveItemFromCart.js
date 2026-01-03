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
        throw new Error(error.message || "Помилка при видаленні товару");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Товар успішно видалений з корзини");
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: (error) => {
      console.error("Помилка при видаленні товара з корзины", error);
      toast.error(error.message || "Не вдалося видалити товар");
    },
  });
};
