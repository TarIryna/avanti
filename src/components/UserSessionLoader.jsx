// components/UserSessionLoader.jsx
"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUserSession } from "@/fetchActions/user/useUser";
import { useAddItemsToCart } from "@/fetchActions/cart/useAddItemsToCart";
import { getNewOrder } from "@/helpers/cartUtils";

export const UserSessionLoader = () => {
  const queryClient = useQueryClient();
  const { data: user, status } = useUserSession();
  const addItemsMutation = useAddItemsToCart();

  useEffect(() => {
    const syncLocalStorageCart = async () => {
      if (!user) return;

      const localCartRaw =
        typeof window !== "undefined" && localStorage.getItem("cart");
      if (!localCartRaw) return;

      const items = getNewOrder(localCartRaw);
      if (!items?.length) return;

      try {
        await addItemsMutation.mutateAsync({ localItems: items, userId: user.id });
        localStorage.removeItem("cart");

        // подтягиваем обновлённую корзину
        queryClient.invalidateQueries({ queryKey: ["cart", user.id] });
      } catch (error) {
        console.error("Ошибка синхронизации корзины:", error);
      }
    };

    if (status === "authenticated") {
      syncLocalStorageCart();
    }
  }, [user, status, addItemsMutation, queryClient]);

  return null;
};
