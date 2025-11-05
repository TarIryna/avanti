// hooks/useUpdateUser.js
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, orderData }) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении пользователя");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Можно обновить кэш, например userSession, если это тот же пользователь
      queryClient.invalidateQueries(["userSession"]);
    },
    onError: (error) => {
      console.error("Ошибка при обновлении пользователя", error);
    },
  });
};
