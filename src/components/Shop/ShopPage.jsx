"use client";

import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";
import { shopEmails } from "./constants";
import { shopsData } from "./data";
import * as S from "./styles";
import { useRouter } from "next/navigation";

const ShopPage = () => {
      const router = useRouter();
  // const { data: user, isLoading, isError } = useUserSession();
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const isAdmin = user && shopEmails.some(i => i === user.email)
  //   setIsAdmin(isAdmin)
  // }, [user])


  return (
     <section className="container page">
      {/* {isAdmin ? ( */}
        <S.Title>МАГАЗИН ОНЛАЙН</S.Title>
        <S.MenuList>
          {shopsData.map((i) => (
                 <S.MenuShopButton onClick={() => router.push(`/shop/${i.id}`)}>{i.name}</S.MenuShopButton>
                ))}
        </S.MenuList>
      {/* ) : ( */}
        {/* <S.Title>У вас нема доступу до адмін панелі</S.Title> */}
      {/* )} */}

      {/* {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка завантаження</p>} */}

    </section>
  );
};

export default ShopPage;
