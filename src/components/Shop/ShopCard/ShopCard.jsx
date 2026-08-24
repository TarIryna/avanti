"use client";

import ImageWrapper from "@/components/Product/ImageWrapper";
import Sizes from "../../Product/Sizes";
import SizesChange from "./SizesChange/SizesChange";
import * as S from "./styles";

const ShopCard = ({ item, setProduct, isList, info, shop, type, comment, staff, isOrder, hideImage}) => {
  if (!item){
    return
  }

  const sizes = item.sizes_all
  const name = item.name?.slice(0, 1).toUpperCase() + item.name?.slice(1);
  const image = item.images?.[0]
  const isSale = item.price > 0 && item.price2 > 0;
  const text = type === "arrival" ? "Додаємо розміри" : type === "decrease" ?  "Списуємо розміри" : "Повернення розміру:"
  
  const onClick = () => {
    if (isList){
      setProduct(item)
      return
    }
   
  }

  const onSetProduct = (data) => {
    if (setProduct && typeof setProduct === 'function'){
          setProduct(data)
        }
  }

  return (
      <S.CardWrapper onClick={onClick}>
        <S.Title >{name}</S.Title>
          <S.Flex>
          {!!image && !hideImage && <S.ImageWrapper>
          <ImageWrapper
              src={image}
              alt={item.code}
              fill
            />
            </S.ImageWrapper>}
          {!isList && !isOrder && <div> 
            <Sizes sizes={sizes["1"]} item={item} info isShop color="grey" shop="1" isText/>
            <Sizes sizes={sizes["2"]} item={item} info isShop color="grey" shop="2"/>
            {sizes["3"] && <Sizes sizes={sizes["3"]} item={item} info isShop color="grey" shop="3"/>}
             </div>}
           {!isList && isOrder && <div> 
            <Sizes sizes={item.sizes} item={item} info color="grey" isText/>
             </div>}
             
            </S.Flex>
            {!isList && !info &&
              <> <S.Text>{text}</S.Text>
            <SizesChange item={item} setProduct={onSetProduct} type={type} shop={shop} comment={comment} staff={staff} isOrder={isOrder}/>
             </>
         }
          {isSale ? (
            <S.PriceWrapper >
              <S.LastPrice>{item.price2} грн.</S.LastPrice>
              <S.SalePrice>{item.price} грн.</S.SalePrice>
            </S.PriceWrapper>
          ) : (
            <S.PriceContainer>
              <span className="current-price">{item.price ?? 0} грн.</span>
            </S.PriceContainer>
          )}
        </S.CardWrapper>
  );
};

export default ShopCard;
