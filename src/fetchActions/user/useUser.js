"use client";

import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export const useUserSession = () => {
  return useQuery({
    queryKey: ["userSession"],
    queryFn: async () => {
      const session = await getSession(); // NextAuth
      return session?.user || null;ch
    },
    staleTime: 1440 * 60 * 1000, // 5 минут кэш
  });
};
