import * as S from "./styles";
const Description = ({ data }) => {
  return (
    <S.Description>
      <p>
        <S.DescriptionTitle>Ціна: </S.DescriptionTitle>
        {data?.price2 && data?.price2 > 0 && <S.DescriptionPrice isFirst={!!data?.price2}>{data.price2} грн</S.DescriptionPrice>}
        <S.DescriptionPrice isPrice={!!data?.price2}>{data.price} грн</S.DescriptionPrice>
      </p>
      <p>
        <S.DescriptionTitle>Матеріал верху: </S.DescriptionTitle>
        <S.DescriptionValue>{data.material_top}</S.DescriptionValue>
      </p>
      <p>
        <S.DescriptionTitle>Матеріал підкладки: </S.DescriptionTitle>
        <S.DescriptionValue>{data.material_inside}</S.DescriptionValue>
      </p>
      <p>
        <S.DescriptionTitle>Колір: </S.DescriptionTitle>
        <S.DescriptionValue>{data.color}</S.DescriptionValue>
      </p>
    </S.Description>
  );
};

export default Description;
