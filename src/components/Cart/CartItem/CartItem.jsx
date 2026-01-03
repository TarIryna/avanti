"use client";
import IconDelete from "@/assets/icons/delete.svg";
import Image from "next/image";
import * as S from "./styles";
import { useCartStore } from "@/components/GeneralProvider/context/CartProvider";
import { useState } from "react";

const CartItem = ({ data, status }) => {
  const itemId = data?._id ?? data?.id ?? data?.product;
  const { removeItem, changeItemQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(data?.quantity ?? 0);

  const deleteItem = () => {
    removeItem({ productId: itemId, size: data.size });
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    changeItemQuantity({ ...data, quantity: newQuantity });
  };

  const decrement = () => {
    if (quantity <= 1) return; // минимальное количество
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    changeItemQuantity({ ...data, quantity: newQuantity });
  };

  return (
    <>
      {data && (
        <S.Wrapper>
          <S.ImageWrapper>
            {data?.image && data.image !== "no image" ? (
              <Image src={data.image} fill />
            ) : (
              <Image src="/default.webp" fill />
            )}
          </S.ImageWrapper>
          <S.Content>
            <S.Text>Розмір: {data.size}</S.Text>
            <S.Text>
              Кількість:  
              <S.QuantityButton onClick={decrement}>-</S.QuantityButton> 
              {quantity}
              <S.QuantityButton onClick={increment}>+</S.QuantityButton>
            </S.Text>
            <S.Text>Ціна: {data.price} грн.</S.Text>

            {(status === "new" || status === "progress") && (
              <Image
                className="pointer"
                src={IconDelete.src}
                width={24}
                height={24}
                onClick={deleteItem}
                alt="delete"
              />
            )}
          </S.Content>
        </S.Wrapper>
      )}
    </>
  );
};

export default CartItem;
