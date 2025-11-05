"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserSession } from "@/fetchActions/user/useUser";
import { useAddItemToCart } from "@/fetchActions/cart/useAddItemToCart";
import * as S from "./styles";

const Sizes = ({ sizes, item }) => {
  const [size, setSize] = useState("");
  const { data: user} = useUserSession()
  const userId = user?.id;
  const itemId = item?._id ?? item?.id;
  const { mutate, isSuccess } = useAddItemToCart()

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


  if (!userId) {
    // 🔹 Гость
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...localCart, newItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Товар додано у кошик!");
  } else {
    // 🔹 Авторизованный пользователь
    try {
      mutate({ 
        userId,       // ID пользователя
        ...newItem    // все нужные поля для сервера
      });
    } catch (error) {
      toast.error("Не вдалося додати товар");
    }
  }
};



  return (
    <S.SizesWrapper>
      {!!sizes && <S.ProductSizes>Розміри в наявності:</S.ProductSizes>}
      <S.SizesContainer>
        {sizes &&
          sizes.map((el) => (
            <S.SizesBlock
              isActive={el === size}
              onClick={() => setSize(el)}
              key={`${item.code}${el}`}
            >
              {el}
            </S.SizesBlock>
          ))}
      </S.SizesContainer>
      <S.SizesButton onClick={() => onButtonClick()} disabled={!size}>
        Додати в кошик
      </S.SizesButton>
    </S.SizesWrapper>
  );
};
export default Sizes;
