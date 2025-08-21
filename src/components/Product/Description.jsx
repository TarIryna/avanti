import * as S from "./styles";
const Description = ({ data }) => {
  return (
    <div>
      <p>
        <S.DescriptionTitle>Ціна: </S.DescriptionTitle>
        <S.DescriptionPrice>{data.price} грн</S.DescriptionPrice>
      </p>
      <p>
        <S.DescriptionTitle>Матеріал верху: </S.DescriptionTitle>
        <S.DescriptionValue>{data.material_top}</S.DescriptionValue>
      </p>
      <p>
        <S.DescriptionTitle>Матеріал всередині: </S.DescriptionTitle>
        <S.DescriptionValue>{data.material_inside}</S.DescriptionValue>
      </p>
      <p>
        <S.DescriptionTitle>Колір: </S.DescriptionTitle>
        <S.DescriptionValue>{data.color}</S.DescriptionValue>
      </p>
    </div>
  );
};

export default Description;
