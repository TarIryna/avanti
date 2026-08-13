"use client";

import ImageWrapper from "@/components/Product/ImageWrapper";
import * as S from "./styles";
import SizesInfo from "@/components/Base/SizesInfo";
import Image from "next/image";

const CatalogItem = ({ item }) => {
  if (!item){
    return
  }

  const name = item.name?.slice(0, 1).toUpperCase() + item.name?.slice(1);
  const image = item.images?.[0]
  const isSale = item.price > 0 && item.price2 > 0;
  

  return (
    <>
      {image && (
          <S.CardWrapper>
            <Image src="/avanti2.png" width="200" height="200" alt="avanti"/>
          <S.ImageWrapper>
          <ImageWrapper
              src={image}
              alt={item.code}
              fill
            />
            </S.ImageWrapper>
            <S.Code>{`код: ${item.code}`}</S.Code>
            <SizesInfo item={item} isTextHidden />
        
          {isSale ? (
            <S.InfoContainer>
              <S.PriceWrapper >
                <S.LastPrice>{item.price2} грн.</S.LastPrice>
                <S.SalePrice>{item.price} грн.</S.SalePrice>
              </S.PriceWrapper>

                         {item.material === 1 && <S.LabelWrapper>
              <p>Матеріал верху - натуральна шкіра</p>
              <div>
              <Image src="/leather2.png" width="80" height="100" alt="leather"/>
              </div>
            </S.LabelWrapper>}
            
            </S.InfoContainer>
          ) : (
            <S.InfoContainer>
            <S.PriceContainer>
              <S.Price>{item.price ?? 0} грн.</S.Price>
            </S.PriceContainer>
            {item.material === 1 && <S.LabelWrapper>
              <p>Матеріал верху - натуральна шкіра</p>
              <div>
              <Image src="/leather2.png" width="50" height="50" alt="leather"/>
              </div>
            </S.LabelWrapper>}

            </S.InfoContainer>
          )}
        </S.CardWrapper>
      )}
    </>
  );
};

export default CatalogItem;
