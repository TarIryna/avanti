"use client";
import * as S from "../styles";

const DeliveryPage = (props) => {
  return (
      <S.PageWrapper className="container page">
        <S.Title>ДОСТАВКА І ОПЛАТА</S.Title>
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
          <S.Text>1. Накладеним платежем (комісія нової пошти 2% від суми). Передоплата 100 грн на картку, яка буде врахована у кінцевому розрахунку</S.Text>
          <S.Text>2. Оплата на рахунок</S.Text>
        </S.ContentPart>
      </S.PageWrapper>
  );
};

export default DeliveryPage;
