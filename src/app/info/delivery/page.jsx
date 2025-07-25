"use client";
import * as S from "../styles";

const DeliveryPage = (props) => {
  return (
    <>
      <S.Title>ДОСТАВКА І ОПЛАТА</S.Title>
      <S.PageWrapper className="container">
        <S.ContentPart>
          <S.Subtitle>Методи доставки:</S.Subtitle>
          <S.Text>1. Нова пошта</S.Text>
          <S.Text>
            <ul>
              <li>кур'єром</li>
              <li>у відділення</li>
              <li>у поштомат</li>
            </ul>
          </S.Text>

          <S.Text>2. Meest</S.Text>
          <S.Text>
            <ul>
              <li>кур'єром</li>
              <li>у відділення</li>
              <li>у поштомат</li>
            </ul>
          </S.Text>

          <S.Text>3. Укрпошта</S.Text>
          <S.Text>
            <ul>
              <li>у відділення</li>
            </ul>
          </S.Text>

          <S.Text>4. Самовивіз</S.Text>
          <S.Text>
            <ul>
              <li>Ужгород, вул.Корзо, 10</li>
              <li>Ужгород, вул.Заньковецької, 2</li>
            </ul>
          </S.Text>
        </S.ContentPart>
        <S.ContentPart>
          <S.Subtitle>Методи оплати:</S.Subtitle>
          <S.Text>1. Накладеним платежем</S.Text>
          <S.Text>
            Передоплата 100 грн на картку, залишок накладеним платежем (буде
            додаткова комісія від транспортної служби)
          </S.Text>
          <S.Text>2. Оплата на картку</S.Text>
          <S.Text>Повна оплата на картку</S.Text>
        </S.ContentPart>
      </S.PageWrapper>
    </>
  );
};

export default DeliveryPage;
