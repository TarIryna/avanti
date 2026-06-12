"use client";
import { useCartStore } from "../GeneralProvider/context/CartProvider";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { trackAddToCart } from "@/helpers/pixelTracker";

const Sizes = ({ sizes, item, isShop, onSelect, info, color='black', shop, isText }) => {
  const [size, setSize] = useState(null);
  const [isNotification, setIsNotification] = useState(false);

  const itemId = item?._id ?? item?.id;
  const { addItem } = useCartStore();


  const isSelectedSize = () => {
    if (sizes.length === 1){
      setSize(sizes[0])
      return sizes[0]
    }
    if (!size) {
      setIsNotification(true);
      return false;
    }
    return size;
  };

  const onButtonClick = async () => {
    if (info) return
    const selectedSize = isSelectedSize();
    if (!selectedSize) return;

    if (isShop && typeof onSelect === 'function'){
      onSelect(selectedSize)
      return
    }

    const newItem = {
      product: itemId,
      price2: item.price2 ?? item.price,
      price: item.price,
      image: item.small_image || item.images?.[0],
      code: item.code,
      size: selectedSize,
      quantity: 1,
    };

    await addItem(newItem);
    trackAddToCart({
      id: newItem.code,
      name: item?.name ?? "",
      price: newItem.price,
    })
  };

  useEffect(() => {
    if (isNotification) setIsNotification(false);
  }, [size]);

  return (
    <S.SizesWrapper>
    {!!(item.type === 3 ? item.color : sizes?.length) &&  isText && (
        <S.ProductSizes size={info ? 'sm': 'lg'}>
            {item.type === 3
              ? "Колір в наявності"
              : "Розміри в наявності:"}
          </S.ProductSizes>
        )}

      {isNotification && (
        <S.Notification>Необхідно додати розмір</S.Notification>
      )}

      <S.SizesContainer isNotification={isNotification}>
       {!!sizes?.length && isShop && <S.SizesBlock color={color}> A{shop} </S.SizesBlock>} 
        {sizes?.map((el) => {
          const isDisabled = el?.q === 0;

          if (el){
            return (
              <S.SizeContainer
                          isOne={sizes?.length === 1}>
                <S.SizesBlock
                  key={`${item.code}${el?.size}`}
                  isActive={el?.size === size?.size}
                  isDisabled={isDisabled}
                  onClick={() => !isDisabled && !info && setSize(el)}
      
                  color={color}
                >
                  {el?.size}
                </S.SizesBlock>
                {info && <S.SizesBlock color="grey">{el?.q}</S.SizesBlock>}
                </S.SizeContainer>
              );
          } 
        })}
      </S.SizesContainer>

      {!info && <S.SizesButton onClick={onButtonClick} disabled={!size && sizes.length > 1}>
        Додати в кошик
      </S.SizesButton>}
    </S.SizesWrapper>
  );
};

export default Sizes