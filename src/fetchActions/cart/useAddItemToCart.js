"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, product, price, image, size, quantity, code }) => {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: userId, product, price, image, size, quantity, code }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add item");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (_data, variables) => {
      const { userId } = variables;
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success("Товар успішно доданий у корзину");
    },
    onError: (error) => {
      console.error("Ошибка добавления товаров в корзину:", error);
      toast.error(error.message || "Не вдалось додати товар");
    },
  });
};
