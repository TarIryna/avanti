"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ order, status, orderId, delivery }) => {
      const params = {
        date: new Date(),
        status,
        id: order._id,
        orderId,
        delivery,
      };

      const res = await fetch("/api/order/new", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Не вдалося оновити статус замовлення");
      }

      return res.json();
    },

    onSuccess: (_, variables) => {
      // например, обновляем список заказов
      queryClient.invalidateQueries(["orders"]);
      toast.success("Статус замовлення оновлено ✅");
    },

    onError: (error) => {
      console.error("Помилка оновлення:", error);
      toast.error("Не вдалося оновити замовлення");
    },
  });
};
