"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@/store/selectors";
import * as S from "./styles";

const Sizes = ({ sizes, item }) => {
  const [size, setSize] = useState("");
  const userId = useUser()?.user?.id;

  const onButtonClick = async () => {
    if (!userId) {
      const currentCart = localStorage?.getItem("cart");
      const image = item.small_image ?? item.image ?? item.image1;
      const newItem = `code=${item._id},size=${size},price=${item.price},image=${image}`;
      localStorage?.setItem(
        "cart",
        currentCart ? `${currentCart};${newItem}` : newItem
      );
    }
    try {
      const response = await fetch("/api/order/new", {
        method: "POST",
        body: JSON.stringify({
          productId: item._id,
          userId,
          size,
          quantity: 1,
          status: "new",
          image: item.image1,
          price: item.price2 ?? item.price,
        }),
      });

      if (response.ok) {
        toast.success("Товар додано у кошик!");
      }
    } catch (error) {
      console.log(error);
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
