import * as S from "./styles";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui";
import { useRouter } from "next/navigation";
import { useUser } from "@/store/selectors";

const Profile = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { push } = useRouter();
  const { isAuth, user } = useUser();

  const onSignOut = () => {
    signOut().then(() => push("/"));
  };

  return (
    <S.Wrapper>
      <S.Title>Мій профіль:</S.Title>
      <S.List>
        <S.Item href="/profile/info">Мої дані</S.Item>
        <S.Item href="/profile/orders">Мої замовлення</S.Item>
        <S.Item href="/profile/returns">Мої Повернення</S.Item>
        <Button onClick={onSignOut}>Вийти з аккаунту</Button>
      </S.List>
    </S.Wrapper>
  );
};

export default Profile;
