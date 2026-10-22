import * as S from "./styles";
import { Input } from "@/components/ui";

const Size = ({ size, shop, sizes, setSizes }) => {
 const changeQuantity = (e) => {
    const targetSize = e.target.name;
    const targetValue = e.target.value;

    if (!sizes) return;
    const targetSizes = sizes[shop?.toString()]
    let updatedSizes = sizes

    // 2. Напрямую маппим проп `sizes` и обновляем родительский стейт
    const updatedTargetSizes = targetSizes.map((el) => {
      if (el && String(el.size) === String(targetSize)) {
        return {
          ...el,
          q: targetValue === "" ? "" : Number(targetValue),
        };
      }
      return el;
    });

    updatedSizes[shop?.toString()] = updatedTargetSizes

    // 3. Вызываем родительский сеттер напрямую
    setSizes(updatedSizes);
  };
  
  return (
        <S.Block>
              <S.SizesBlock>
                {size?.size}
              </S.SizesBlock>
              <S.SizesBlock>
                <Input
                  type="number"
                  defaultValue={size.q}
                  name={size.size}
                  onValueChange={(e) => changeQuantity(e)}
                />
              </S.SizesBlock>
    </S.Block>
  );
};
export default Size;
