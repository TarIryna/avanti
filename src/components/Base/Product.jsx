"use client";

import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";
import { baseEmails} from "@/data";
import * as S from "./styles";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const router = useRouter();
  const { data: user } = useUserSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(!!user && baseEmails.includes(user.email))
  }, [user])


  return (
     <section className="container page">
      {isAdmin ? (
        <>
        <S.Title>ОПЕРАЦІЇ З ТОВАРАМИ</S.Title>
        <S.MenuList>
                 <S.MenuShopButton onClick={() => router.push(`/shop/new`)}>Новый товар</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/base/product/editor`)}>ТОВАРЫ РЕДАКТИРОВАНИЕ</S.MenuShopButton>
                 <S.MenuShopButton onClick={() => router.push(`/base/product/view`)}>ТОВАРЫ ПРОСМОТР</S.MenuShopButton>
        </S.MenuList>
        </>
      ) : ( 
       <S.Title>У вас нема доступу до адмін панелі</S.Title> 
       )}

    </section>
  );
};

export default ProductPage;
