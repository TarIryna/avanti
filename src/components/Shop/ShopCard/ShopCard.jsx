"use client";

import ImageWrapper from "@/components/Product/ImageWrapper";
import { changeProductIdAction } from "@/store/actions/product";
import { useRouter } from "next/navigation";
import Sizes from "../../Product/Sizes";
import SizesAdd from "./SizesAdd/SizesAdd";
import * as S from "./styles";

const ShopCard = ({ item, setProduct, isSelected, isList}) => {
  const router = useRouter();
  const sizes = item?.type === 3 ? [{size: item.color ?? "колір", q: 1}] : item?.sizes?.length > 0 ? item.sizes : [{size: "один розмір", q: 1}]
  const name = item.name.slice(0, 1).toUpperCase() + item.name.slice(1);
  const image = item.images[0]
  const isSale = item.price > 0 && item.price2 > 0;

  return (
    <>
      {item && image && (
          <S.CardWrapper>
          <S.Title onClick={() => setProduct(item)}>{name}</S.Title>
          <S.ImageWrapper onClick={() => setProduct(item)}>
          <ImageWrapper
              src={image}
              alt={item.code}
              fill
            />
            </S.ImageWrapper>
          {!isList && <div> 
            <Sizes sizes={sizes} item={item} info color="grey"/>
            <S.Text>Додаємо розміри</S.Text>
            <SizesAdd item={item}/>
          </div>}
          {isSale ? (
            <S.PriceWrapper onClick={() => setProduct(item)}>
              <S.LastPrice>{item.price2} грн.</S.LastPrice>
              <S.SalePrice>{item.price} грн.</S.SalePrice>
            </S.PriceWrapper>
          ) : (
            <S.PriceContainer onClick={() => setProduct(item)}>
              <span className="current-price">{item.price ?? 0} грн.</span>
            </S.PriceContainer>
          )}
        </S.CardWrapper>
      )}
    </>
  );
};

export default ShopCard;
