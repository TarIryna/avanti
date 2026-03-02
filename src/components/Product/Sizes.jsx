"use client";
import { useCartStore } from "../GeneralProvider/context/CartProvider";
import * as S from "./styles";
import { useEffect, useState } from "react";

const Sizes = ({ sizes, item }) => {
  const [size, setSize] = useState(item.type === "bags" ? item.color : "один розмір");
  const [isActive, setActive] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const itemId = item?._id ?? item?.id;
  const { addItem } = useCartStore()
  const length = sizes?.length
  const isFirstSize = !!sizes?.toString()?.length

const isSelectedSize = () => {
  if (size === "один розмір" && sizes?.length > 1) {
    setIsNotification(true);
    return false;
  }

  if (size === "один розмір" && sizes?.length === 1) {
    return sizes[0]; // ⬅️ возвращаем реальный размер
  }

  return size;
};

const onButtonClick = async () => {
  const selectedSize = isSelectedSize();
  if (!selectedSize) return;

  const newItem = {
    product: itemId,
    price: item.price,
    image: item.small_image || item.image1,
    code: item.code,
    size: selectedSize, // ✅ всегда корректный размер
    quantity: 1,
  };

  await addItem(newItem);
};


useEffect(() => {
  if (isNotification){
    setIsNotification(false)
  }
}, [size])


  return (
    <S.SizesWrapper>
      {!!sizes && <S.ProductSizes>Розміри в наявності:</S.ProductSizes>}
      {isNotification && <S.Notification>Необхідно додати розмір</S.Notification>}
      <S.SizesContainer isNotification={isNotification}>
        {!!length && isFirstSize ?
          sizes.map((el) => (
            <S.SizesBlock
              isActive={el === size}
              onClick={() => setSize(el)}
              key={`${item.code}${el}`}
              isOne={length === 1}
            >
              {el}
            </S.SizesBlock>
          )) :
          <S.OneSize onClick={() => setActive(true)}isActive={isActive}>{size}</S.OneSize>}
      </S.SizesContainer>
      <S.SizesButton onClick={() => onButtonClick()} disabled={!size}>
        Додати в кошик
      </S.SizesButton>
    </S.SizesWrapper>
  );
};
export default Sizes;
