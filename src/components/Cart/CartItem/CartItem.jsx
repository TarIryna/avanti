"use client";

import { useFetchAllOrders } from "@/helpers/useFetchAllOrders";
import { toast } from "react-hot-toast";
import { useUser } from "@/store/selectors";
import IconDelete from "@/assets/icons/delete.svg";
import Image from "next/image";
import * as S from "./styles";

const CartItem = ({ admin, data, status }) => {
  const userId = useUser()?.user?.id;
  const deleteOrder = async () => {
    try {
      const response = await fetch(`/api/order/new/${data.code.toString()}`, {
        method: "DELETE",
      });

      // useEffect(() => {
      //   const localStorageData =
      //     window &&
      //     typeof window !== "undefined" &&
      //     localStorage.getItem("cart");
      //   if (localStorageData) {
      //     getNewOrder(localStorageData);
      //   }
      // }, [isAuth]);

      if (response.ok) {
        toast.success("Успішно видалено із кошика!");
        useFetchAllOrders(userId);
      }
    } catch (error) {
      console.log(error);
    }
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
              onClick={deleteOrder}
              alt="delete"
            />
          )}
        </S.Wrapper>
      )}
    </>
  );
};
export default CartItem;
