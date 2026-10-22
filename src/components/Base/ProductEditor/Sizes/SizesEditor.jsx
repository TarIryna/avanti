"use client";
import * as S from "./styles";
import { useEffect, useState } from "react";
import Size from "./Size";
import { Button } from "@/components/ui";
import { getSizesObject } from "@/helpers/sizesPrepare";
import toast from "react-hot-toast";

const SizesEditor = ({ product }) => {
const [sizes, setSizes] = useState(getSizesObject(product))

useEffect(() => {
  console.log(product)
}, [product])

  const onButtonClick = async() => {
    try {
        const response = await fetch(`/api/product/update`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                          sizes_all: sizes,
                          code: product.code
                      }),
                  });
      
                  if (!response.ok) throw new Error("Ошибка сервера");
                  else {
                    toast.success('Успешно обновлены размеры');
                  }

    } catch (e) {
      toast.error(e.message ?? 'Ошибка обновления размеров')
    }
  }


  return (
    <S.SizesWrapper>
      <S.SizesContainer>
      {sizes && Object.entries(sizes).map(shopData => <S.SizesBlock>
        <S.Shop>{`А${shopData[0]}`}</S.Shop>
        {shopData[1] && shopData[1]?.map(size =>
          <Size size={size} shop={shopData[0]} setSizes={setSizes} sizes={sizes}/>
        )}
      </S.SizesBlock>)}
      </S.SizesContainer>

      <Button onClick={onButtonClick}>
        Оновити розміри
      </Button>
    </S.SizesWrapper>
  );
};

export default SizesEditor