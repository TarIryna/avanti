"use client";

import Image from "next/image";
import { changeProductIdAction } from "@/store/actions/product";
import { useRouter } from "next/navigation";
import Sizes from "../../Product/Sizes";
import * as S from "./styles";

const Card = ({ item }) => {
  const router = useRouter();
  const sizes = item.sizes?.split(" ");
  const isSale = item.price > 0 && item.price2 > 0;
  const name = item.name.slice(0, 1).toUpperCase() + item.name.slice(1);
  const image = item.small_iamge ?? item.image1;

  const handleClick = (id) => {
    changeProductIdAction(id);
    router.push(`product/${id}`);
  };

  return (
    <>
      {item && item.image1 && item.price && (
        <S.CardWrapper>
          <S.Title>{name}</S.Title>
          <S.ImageWrapper>
            <Image
              src={image}
              alt="user_image"
              fill
              onClick={() => handleClick(item.code)}
            />
          </S.ImageWrapper>
          <div> 
            <Sizes sizes={sizes} item={item} />
          </div>
          {isSale ? (
            <S.PriceWrapper>
              <S.LastPrice>{item.price2} грн.</S.LastPrice>
              <S.SalePrice>{item.price} грн.</S.SalePrice>
            </S.PriceWrapper>
          ) : (
            <div className="flex-center">
              <span className="current-price">{item.price} грн.</span>
            </div>
          )}
        </S.CardWrapper>
      )}
    </>
  );
};

export default Card;
