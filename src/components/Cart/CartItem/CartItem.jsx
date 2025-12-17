"use client";
import { toast } from "react-hot-toast";
import IconDelete from "@/assets/icons/delete.svg";
import Image from "next/image";
import * as S from "./styles";
import { useRemoveItemFromCart } from "@/fetchActions/cart/useRemoveItemFromCart";
import { useCartStore } from "@/components/GeneralProvider/context/CartProvider";

const CartItem = ({ data, status }) => {
  const itemId = data?._id ?? data?.id ?? data?.product
  const { removeItem } = useCartStore();

  const deleteItem = () => {
    removeItem({productId: itemId, size: data.size});
  };


  return (
    <>
      {data && (
        <S.Wrapper>
          <S.ImageWrapper>
            {!!data?.image && data?.image !== 'no image' ?  <Image src={data.image} fill /> : <Image src="/default.webp" fill/>}
          </S.ImageWrapper>
          <S.Content>
            <S.Text className="mr-10">Розмір: {data.size}</S.Text>
            <S.Text className="mr-10">Кількість: {data.quantity ?? 1}</S.Text>
            <S.Text className="mr-10">Ціна: {data.price} грн.</S.Text>
          </S.Content>
          {(status === "new" || status === "progress") && (
            <Image
              className="pointer"
              src={IconDelete.src}
              width="24"
              height="24"
              onClick={() => deleteItem()}
              alt="delete"
            />
          )}
        </S.Wrapper>
      )}
    </>
  );
};
export default CartItem;
