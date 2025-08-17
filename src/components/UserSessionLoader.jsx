"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { loginUserAction, logoutUserAction } from "@/store/actions/user";
import { useDispatch } from "react-redux";

const UserSessionLoader = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(loginUserAction(session.user));
    } else if (status === "unauthenticated") {
      dispatch(logoutUserAction());
    }
  }, [dispatch, session, status]);

  return null;
};

export default UserSessionLoader;
