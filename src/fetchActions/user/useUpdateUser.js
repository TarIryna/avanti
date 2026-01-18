// hooks/useUpdateUser.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useUpdateUser = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, user }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      return res.json(); // updatedUser
    },

    onSuccess: (updatedUser) => {
      // 🔥 мгновенно обновляем UI
      queryClient.setQueryData(["userSession"], (old) => ({
        ...old,
        ...updatedUser,
      }));

      toast.success("Дані оновлено");
      onClose?.();
    },
    onMutate: async ({ user }) => {
  await queryClient.cancelQueries(["userSession"]);

  const previousUser = queryClient.getQueryData(["userSession"]);

  queryClient.setQueryData(["userSession"], (old) => ({
    ...old,
    ...user,
  }));

  return { previousUser };
},

  onError: (_err, _vars, context) => {
    queryClient.setQueryData(["userSession"], context.previousUser);
    toast.error("Помилка оновлення");
    console.log(_err)
  },

    // onError: () => {
    //   toast.error("Помилка оновлення");
    // },
  });
};
