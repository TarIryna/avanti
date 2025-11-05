"use client";
import * as S from "./styles";
// import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/fetchActions/user/useUser";
import { useEffect } from "react";

const Profile = () => {
  // const [myOrders, setMyOrders] = useState([]);
  const { push } = useRouter();
  const { data: user, isSuccess } = useUserSession();
  const isAuth = !!user && isSuccess;

  const onSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    if (!isAuth) push("/");
  }, [isAuth]);

  return (
    <S.Wrapper className="page">
      <S.Title>Мій профіль:</S.Title>
      <S.List>
        <S.Item href="/profile/info">Мої дані</S.Item>
        <S.Item href="/profile/orders">Мої замовлення</S.Item>
        {/* <S.Item href="/profile/returns">Мої Повернення</S.Item> */}
        <Button onClick={onSignOut}>Вийти з аккаунту</Button>
      </S.List>
    </S.Wrapper>
  );
};

export default Profile;
