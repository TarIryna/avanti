"use client";
import * as S from "../styles";

const ContactsPage = () => {
  return (
      <S.PageWrapper className="container page">
        <S.Title invisible>Контакти магазину Аванті в місті Ужгород</S.Title>
        <S.SecondTitle>НАШІ КОНТАКТИ</S.SecondTitle>
        <S.ContentPart>
          <S.Subtitle>Телефони:</S.Subtitle>
          <S.Text>
            <a href="tel:+380506665992">+380506665992</a><br/>
            <a href="tel:+380506927217">+380506927217</a><br/>
            <a href="tel:+380664811752">+380664811752</a><br/>
          </S.Text>
          <S.Subtitle>Email:</S.Subtitle>
          <a href="mailto:avanti2uzh@gmail.com">avanti2uzh@gmail.com</a>
          <S.Subtitle>Адреси магазинів:</S.Subtitle>
          <S.Text>
            <p>м.Ужгород, вул.Корзо, 10</p>
            <p>м.Ужгород, вул.Заньковецької, 2</p>
          </S.Text>
        </S.ContentPart>
      </S.PageWrapper>
  );
};

export default ContactsPage;
