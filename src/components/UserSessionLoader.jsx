"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "./GeneralProvider/context/CartProvider";

export const UserSessionLoader = () => {
  const { data: session } = useSession();
  const {setUserId} = useCartStore();

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);   // <-- САМ ПРОИЗОЙДЁТ перенос localCart
    }
  }, [session]);

  return null;
};
