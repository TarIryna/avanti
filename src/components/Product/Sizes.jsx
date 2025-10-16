"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@/store/selectors";
import { addItemToCart } from "@/store/slice/cart";
import * as S from "./styles";
import { useDispatch } from "react-redux";

const Sizes = ({ sizes, item }) => {
  const [size, setSize] = useState("");
  const userId = useUser()?.user?.id;
  const dispatch = useDispatch();
  const itemId = item?._id ?? item?.id;

  const onButtonClick = async () => {
    const newItemToStore = {
      id: itemId,
      code: item.code,
      image: item.image1 ?? item.image ?? item.small_image,
      price: item.price2 ?? item.price,
      size,
    };
    if (!userId) {
      dispatch(addItemToCart(newItemToStore));
      const currentCart = localStorage?.getItem("cart");
      const image = !!item.small_image ? item.small_image : item.image1;
      const newItem = `code=${item.code},size=${size},price=${item.price},image=${image},id=${itemId}`;
      localStorage?.setItem(
        "cart",
        currentCart ? `${currentCart};${newItem}` : newItem
      );
    } else {
      try {
        dispatch(addItemToCart(newItemToStore));
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
