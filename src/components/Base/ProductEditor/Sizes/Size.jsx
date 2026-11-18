import { InputControl } from '@/components/ui/Input/Input';
﻿import * as S from "./styles";

const Size = ({ size, shop, setSizes, disabled }) => {
  const defects = size.isDefect || 0;
  const updateSize = (update) => {
    setSizes(previous => ({
      ...previous,
      [shop]: previous[shop].map(item => item.size === size.size ? update(item) : item),
    }));
  };

  return (
    <S.Block>
      <S.SizesBlock>{size.size}</S.SizesBlock>
      <S.SizesBlock>
        <InputControl
          type="number"
          min={defects}
          step="1"
          value={size.q}
          disabled={disabled}
          aria-label={`Залишок розміру ${size.size}, магазин А${shop}`}
          onChange={event => {
            const value = event.target.value;
            updateSize(item => ({ ...item, q: value === "" ? "" : Number(value) }));
          }}
        />
      </S.SizesBlock>
      <S.DefectCount>Брак: {defects}</S.DefectCount>
      <S.DefectButton
        type="button"
        disabled={disabled || defects >= Number(size.q)}
        onClick={() => updateSize(item => ({ ...item, isDefect: (item.isDefect || 0) + 1 }))}
      >Позначити брак</S.DefectButton>
      <S.DefectButton
        type="button"
        disabled={disabled || !defects}
        onClick={() => updateSize(item => ({ ...item, isDefect: Math.max(0, (item.isDefect || 0) - 1) }))}
      >Зняти брак</S.DefectButton>
    </S.Block>
  );
};

export default Size;
