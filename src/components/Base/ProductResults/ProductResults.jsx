"use client";

import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";
import { baseEmails} from "@/data";
import * as S from "./styles";
import { useRouter } from "next/navigation";

const ProductResultsPage = () => {
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
        <S.Title>РЕЗУЛЬТАТЫ</S.Title>
        <S.MenuList>
                 <S.MenuShopButton onClick={() => router.push(`/base/product/results/liders`)}>Лидеры продаж</S.MenuShopButton>
        </S.MenuList>
        </>
      ) : ( 
       <S.Title>У вас нема доступу до адмін панелі</S.Title> 
       )}

    </section>
  );
};

export default ProductResultsPage;
