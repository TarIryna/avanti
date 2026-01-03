"use client";
import * as S from "../styles";

const GiftsPage = () => {
  return (
      <S.PageWrapper className="container page">
        <S.Title>ПОДАРУНКОВІ КАРТКИ</S.Title>
        <S.ContentPart>
          <S.Text>
            <p>
              В наявності в наших роздрібних магазинах у продажу є подарункові
              картки номіналом 1000грн та 500грн
            </p>
            <p>
              Сертифікати оплачуються за номіналом, а при покупці разом із
              сертифікатом можна використовувати картку на знижку.
            </p>
            <p>Сертифікати не мають обмеження у строках використання</p>
          </S.Text>
        </S.ContentPart>
      </S.PageWrapper>
  );
};

export default GiftsPage;
