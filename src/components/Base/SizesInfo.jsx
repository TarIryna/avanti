"use client";
import { getSizesObject } from "@/helpers/sizesPrepare";
import * as S from "./styles";

const SizesInfo = ({ item, isSmall }) => {
  // Получаем объект с размерами по магазинам
  const sizes = getSizesObject(item)


  // Проверка на наличие данных, чтобы избежать ошибок рендеринга
  if (!sizes || Object.keys(sizes).length === 0) {
    return (
      <S.SizesWrapper isSmall={isSmall}>
        <S.ProductSizes>Розміри відсутні</S.ProductSizes>
      </S.SizesWrapper>
    );
  }

  return (
    <S.SizesWrapper isSmall={isSmall}>
      <S.ProductSizes>Розміри в наявності:</S.ProductSizes>

      <S.SizesContainer>
        {/* 1. Обходим объект по магазинам (превращаем в массив пар [shopId, массив_размеров]) */}
        {Object.entries(sizes).map(([shop, sizesArray]) => {
          
          // Если в магазине нет размеров, этот блок не выводим
          if (!sizesArray || sizesArray.length === 0) return null;

          return (
            <S.ShopGroupBlock key={`shop-${shop}`}>
              {/* Бейдж или заголовок с номером магазина */}
              <S.ShopTitle isSmall={isSmall}>{!isSmall ? (shop === "1" ? "вул. Корзо, 10" : shop === "2" ? "вул.Заньковецької, 2" : "на складі") : `A${shop}`}</S.ShopTitle>

              <S.ShopSizesList>
                {/* 2. Обходим массив размеров внутри конкретного магазина */}
                {sizesArray.map((el) => {
                  const isDisabled = el?.q === 0;

                  return (
                    <S.SizeContainer 
                      key={`${item.code}-${shop}-${el?.size}`}
                    >
                      {/* Кнопка с размером */}
                      <S.SizesBlock isSmall={isSmall}>
                        {!isDisabled ? el?.size : ""}
                      </S.SizesBlock>
                    </S.SizeContainer>
                  );
                })}
              </S.ShopSizesList>
            </S.ShopGroupBlock>
          );
        })}
      </S.SizesContainer>
    </S.SizesWrapper>
  );
};

export default SizesInfo;
