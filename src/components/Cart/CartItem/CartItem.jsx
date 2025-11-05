"use client";
import { toast } from "react-hot-toast";
import { useUserSession } from "@/fetchActions/user/useUser";
import IconDelete from "@/assets/icons/delete.svg";
import Image from "next/image";
import * as S from "./styles";
import { useRemoveItemFromCart } from "@/fetchActions/cart/useRemoveItemFromCart";

const CartItem = ({ admin, data, status }) => {
  const { data: user} = useUserSession()
  const itemId = data?._id ?? data?.id
  const userId = user?._id ?? user?.width

  const { mutate, isLoading } = useRemoveItemFromCart(userId);

  const deleteItem = () => {
    mutate({productId: itemId, size: data.size});
  };


  return (
    <>
      {data && (
        <S.Wrapper>
          <S.ImageWrapper>
            <Image src={data.image} fill />
          </S.ImageWrapper>
          <S.Content>
            <span className="mr-10">Розмір: {data.size}</span>
            <span className="mr-10">Кількість: {data.quantity ?? 1}</span>
            <span className="mr-10">Ціна: {data.price} грн.</span>
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
