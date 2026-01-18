// hooks/useUserSession.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export const useUserSession = () => {
  return useQuery({
    queryKey: ["userSession"],
    queryFn: async () => {
      const session = await getSession();
      return session?.user ?? null;
    },
    staleTime: 5 * 60 * 1000,
  });
};
