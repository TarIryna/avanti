"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useChangeItemQauntityCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
   mutationFn: async ({ userId, product, price, image, size, quantity, code }) => {
  const res = await fetch("/api/cart/change", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      creator: userId,
      product,
      price,
      image,
      size,
      quantity,
      code,
    }),
  });

  let data = null;

  try {
    data = await res.json();
  } catch {
    // если body пустой или не JSON
  }

  if (!res.ok) {
    throw new Error(data?.message || "Failed to change item");
  }

  return data;
  },
    onSuccess: (_data, variables) => {
      const { userId } = variables;
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      setTimeout(() => {
        toast.success("Кількість успішно змінена");
      }, 5);
    },
    onError: (error) => {
      console.error("Ошибка добавления товаров в корзину:", error);
      toast.error("Не вдалось змінити кількість товар");
    },
  });
};
