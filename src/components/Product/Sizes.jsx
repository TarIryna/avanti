"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserSession } from "@/fetchActions/user/useUser";
import { useAddItemToCart } from "@/fetchActions/cart/useAddItemToCart";
import { useCartStore } from "../GeneralProvider/context/CartProvider";
import * as S from "./styles";

const Sizes = ({ sizes, item }) => {
  const [size, setSize] = useState("один розмір");
  const { data: user} = useUserSession()
  const userId = user?.id;
  const itemId = item?._id ?? item?.id;
  const { addItem } = useCartStore()

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
  addItem(newItem)
};



  return (
    <S.SizesWrapper>
      {!!sizes && <S.ProductSizes>Розміри в наявності:</S.ProductSizes>}
      <S.SizesContainer>
        {sizes ?
          sizes.map((el) => (
            <S.SizesBlock
              isActive={el === size}
              onClick={() => setSize(el)}
              key={`${item.code}${el}`}
            >
              {el}
            </S.SizesBlock>
          )) :
          <S.OneSize>{size}</S.OneSize>}
      </S.SizesContainer>
      <S.SizesButton onClick={() => onButtonClick()} disabled={!size}>
        Додати в кошик
      </S.SizesButton>
    </S.SizesWrapper>
  );
};
export default Sizes;
