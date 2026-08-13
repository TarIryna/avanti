"use client";
import * as S from "./styles";
import { getColorById } from "@/data";
import { Input } from "@/components/ui";

// 1. Убрали локальный useState(sizes) и useEffect
const Sizes = ({ sizes, item, setSizes }) => {

  const changeQuantity = (e) => {
    const targetSize = e.target.name;
    const targetValue = e.target.value;

    if (!sizes) return;

    // 2. Напрямую маппим проп `sizes` и обновляем родительский стейт
    const updatedSizes = sizes.map((el) => {
      if (el && String(el.size) === String(targetSize)) {
        return {
          ...el,
          q: targetValue === "" ? "" : Number(targetValue)
        };
      }
      return el;
    });

    // 3. Вызываем родительский сеттер напрямую
    setSizes(updatedSizes);
  };

  return (
    <S.SizesWrapper>
      <S.SizesContainer>
        {/* 4. Рендерим напрямую из пропса sizes */}
        {sizes?.map((el) => {
          if (el) {
            return (
              <S.Block key={`${item.code}${el?.size}`}> {/* Перенесли key на самый верхний элемент в итерации */}
                <S.SizesBlock>
                  {item.type === 3 ? getColorById(el?.size, 'ukr') : el?.size}
                </S.SizesBlock>
                <S.SizesBlock>   
                  <Input
                    type="number"
                    defaultValue={el.q}
                    name={el.size}
                    onValueChange={(e) => changeQuantity(e)}
                  />
                </S.SizesBlock>
              </S.Block>
            );
          }
          return null;
        })}
      </S.SizesContainer>
    </S.SizesWrapper>
  );
};

export default Sizes;
