"use client";

import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";
import { shopEmails } from "@/data";
import { shopsData } from "./data";
import * as S from "./styles";
import { useRouter } from "next/navigation";

const ProductPage = () => {
      const router = useRouter();
      const shops = shopsData.filter(i => i.isShop === true)
  // const { data: user, isLoading, isError } = useUserSession();
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const isAdmin = user && shopEmails.some(i => i === user.email)
  //   setIsAdmin(isAdmin)
  // }, [user])


  return (
     <section className="container page">
      {/* {isAdmin ? ( */}
        <S.Title>ТОВАРИ</S.Title>
        <S.MenuList>
                 <S.MenuShopButton onClick={() => router.push(`/shop/new`)}>НОВИЙ ТОВАР</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/shop/catalog`)}>ФОТО</S.MenuShopButton>
        </S.MenuList>
        
      {/* ) : ( */}
        {/* <S.Title>У вас нема доступу до адмін панелі</S.Title> */}
      {/* )} */}

      {/* {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка завантаження</p>} */}

    </section>
  );
};

export default ProductPage;
