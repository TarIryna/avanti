"use client";
import { useCartStore } from "../GeneralProvider/context/CartProvider";
import * as S from "./styles";
import { useState } from "react";

const Sizes = ({ sizes, item }) => {
  const [size, setSize] = useState("один розмір");
  const [isActive, setActive] = useState(false)
  const itemId = item?._id ?? item?.id;
  const { addItem } = useCartStore()
  const length = sizes?.length

const onButtonClick = async () => {
  // Формируем объект, который соответствует схеме Cart.items
  const newItem = {
    product: itemId,
    price: item.price,
    image: item.small_image || item.image1,
    code: item.code,
    size,        // выбранный размер
    quantity: 1, // по умолчанию 1
  };
  await addItem(newItem)
};



  return (
    <S.SizesWrapper>
      {!!sizes && <S.ProductSizes>Розміри в наявності:</S.ProductSizes>}
      <S.SizesContainer>
        {!!length && !!sizes[0]?.length ?
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
