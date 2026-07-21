"use client";

import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";
import { shopEmails } from "@/data";
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
        <S.Title>ОПЕРАЦІЇ З ТОВАРАМИ</S.Title>
        <S.MenuList>
                 <S.MenuShopButton onClick={() => router.push(`/base/orders`)}>Внести поточні замовлення</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/shop/new`)}>Новий товар</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/shop/photo`)}>ФОТО</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/base/revalue`)}>ПЕРЕОЦІНКА</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/base/catalog`)}>КАТАЛОГИ</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/base/vendors`)}>ПОСТАВЩИКИ</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/base/rate`)}>КУРС</S.MenuShopButton>
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
