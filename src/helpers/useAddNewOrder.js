"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clearLocalCart } from "@/fetchActions/cart/utils/localCart";

export const useAddNewOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items, delivery, userId }) => {
      const params = {
        items,
        delivery,
        userId
      };

      const res = await fetch("/api/order/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const emailParams = {
        to: "avanti2uzh@gmail.com",
        subject: "Нове замовлення на avanti.shoes!" ,
        html: "<h2>Ваше замовлення на сайті avanti.shoes</h2>"
      }

      const emailResult = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailParams)
      })
      console.log(emailResult)

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Не вдалося оновити статус замовлення");
      }

      return res.json();
    },

    onSuccess: (_, variables) => {
      // например, обновляем список заказов
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["cart"]);
      clearLocalCart()
      toast.success("Статус замовлення оновлено ✅");
    },

    onError: (error) => {
      console.log(error)
      console.error("Помилка оновлення:", error);
      toast.error("Не вдалося оновити замовлення");
    },
  });
};
