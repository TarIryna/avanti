"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { loginUserAction, logoutUserAction } from "@/store/actions/user";
import { useUser } from "@/store/selectors";

const UserSessionLoader = () => {
  const { data: session, status } = useSession();
  const user = useUser();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      loginUserAction(session.user);
    } else {
      if (user && status !== "authenticated") {
        logoutUserAction();
      }
    }
  }, [session, status]);

  return null;
};

export default UserSessionLoader;
