"use client";

import HeadButtons from '@/components/Shop/HeadButtons';
import * as S from './styles'
import { useParams, useRouter } from "next/navigation";


const ShopMenuPage = () => {
    const params = useParams();
    const shop = params.shop;

    const router = useRouter();
        return (
      <section className="container page">
        <S.Title>ТОВАРИ</S.Title>
         <HeadButtons isMain shop={shop}/>
        <S.MenuList>
          <S.MenuButton onClick={() => router.push(`/shop/${shop}/product/view`)}>ПЕРЕГЛЯД</S.MenuButton>
          <S.MenuButton onClick={() => router.push(`/shop/catalog`)}>КАТАЛОГИ</S.MenuButton>
          <S.MenuButton onClick={() => router.push(`/shop/photo`)}>ФОТО</S.MenuButton>
          <S.MenuButton onClick={() => router.push(`/shop/${shop}/product/general`)}>ЗАЛИШКИ ЗВІТ</S.MenuButton>
       </S.MenuList>
    </section>
    )
}
export default ShopMenuPage
