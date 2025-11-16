"use client";
import * as S from "../styles";

const InfoBonusPage = (props) => {
  return (
    <>
      <S.Title>БОНУСНА ПРОГРАМА</S.Title>
      <S.PageWrapper className="container">
        <S.ContentPart>
          <S.Text>
            <p>
              За покупку від 2000грн можна отримати віртуальну бонусну картку на
              5% знижки.{" "}
            </p>
            <p>Знижка діє на товар, на який немає інших акцій.</p>
            <p>
              Після отримання 5% картки, накопичивши покупок на суму 10000грн на
              рік, можна підвищити відсоток знижки на картку до 7%!!!
            </p>
            <p>
              За підсумком року також даруємо найбільш активним покупцям приємні
              подарунки!
            </p>
          </S.Text>
        </S.ContentPart>
      </S.PageWrapper>
    </>
  );
};

export default InfoBonusPage;
