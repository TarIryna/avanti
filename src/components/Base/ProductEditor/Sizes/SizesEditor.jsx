"use client";
import * as S from "./styles";
import { useEffect, useState } from "react";
import Size from "./Size";
import { Button } from "@/components/ui";
import { getSizesObject } from "@/helpers/sizesPrepare";
import toast from "react-hot-toast";
import { validateDefectStock } from "@/utils/defectStock";
import { getDestinationName } from "@/data/destination";

const SizesEditor = ({ product }) => {
const [sizes, setSizes] = useState(getSizesObject(product))
const [total, setTotal] = useState(product.total ?? [])
const [saving, setSaving] = useState(false)

useEffect(() => {
  setSizes(getSizesObject(product))
  setTotal(product.total ?? [])
}, [product])

  const onButtonClick = async() => {
    const error = validateDefectStock(sizes)
    if (error) return toast.error(error)
    setSaving(true)
    try {
        const response = await fetch(`/api/product/update`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                          sizes_all: sizes,
                          code: product.code
                      }),
                  });
      
                  const result = await response.json();
                  if (!response.ok) throw new Error(result.error || "Ошибка сервера");
                  else {
                    setSizes(getSizesObject(result));
                    setTotal(result.total ?? []);
                    toast.success('Успешно обновлены размеры');
                  }

    } catch (e) {
      toast.error(e.message ?? 'Ошибка обновления размеров')
    } finally {
      setSaving(false)
    }
  }


  return (
    <S.SizesWrapper>
      <p>Брак входить у залишок, але недоступний на сайті. Збережіть зміни кнопкою «Оновити розміри».</p>
      <p>
        <strong>Залишки</strong>
        {total.map(({ shop, q }) => (
          <span key={shop}>{` · ${getDestinationName(shop) || `А${shop}`} — ${q ?? 0}`}</span>
        ))}
        {` · Всього — ${total.reduce((sum, { q }) => sum + (q ?? 0), 0)}`}
      </p>
      <S.SizesContainer>
      {sizes && Object.entries(sizes).map(shopData => <S.SizesBlock key={shopData[0]}>
        <S.Shop>{`А${shopData[0]}`}</S.Shop>
        {shopData[1] && shopData[1]?.map(size =>
          <Size key={size.size} size={size} shop={shopData[0]} setSizes={setSizes} disabled={saving}/>
        )}
      </S.SizesBlock>)}
      </S.SizesContainer>

      <Button type="button" onClick={onButtonClick} disabled={saving}>
        Оновити розміри
      </Button>
    </S.SizesWrapper>
  );
};

export default SizesEditor
