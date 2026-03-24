"use client";

import ImageWrapper from "@/components/Product/ImageWrapper";
import { changeProductIdAction } from "@/store/actions/product";
import { useRouter } from "next/navigation";
import Sizes from "../../Product/Sizes";
import * as S from "./styles";

const Card = ({ item }) => {
  const router = useRouter();
  const sizes = item.type === "bags" ? [{size: item.color ?? "колір", q: 1}] : item?.sizes2?.length > 0 ? item.sizes2 : [{size: "один розмір", q: 1}]
  const name = item.name.slice(0, 1).toUpperCase() + item.name.slice(1);
  const image = item.images[0]
  const isSale = item.price > 0 && item.price2 > 0;

  const handleClick = (id) => {
    changeProductIdAction(id);
    router.push(`product/${id}`);
  };

  return (
    <>
      {item && image && (
          <S.CardWrapper>
          <S.Title onClick={() => handleClick(item.code)}>{name}</S.Title>
          <S.ImageWrapper onClick={() => handleClick(item.code)}>
          <ImageWrapper
              src={image}
              alt={item.code}
              fill
            />
            </S.ImageWrapper>
          <div> 
            <Sizes sizes={sizes} item={item} />
          </div>
          {isSale ? (
            <S.PriceWrapper onClick={() => handleClick(item.code)}>
              <S.LastPrice>{item.price2} грн.</S.LastPrice>
              <S.SalePrice>{item.price} грн.</S.SalePrice>
            </S.PriceWrapper>
          ) : (
            <div className="flex-center" onClick={() => handleClick(item.code)}>
              <span className="current-price">{item.price ?? 0} грн.</span>
            </div>
          )}
        </S.CardWrapper>
      )}
    </>
  );
};

export default Card;
