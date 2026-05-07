"use client";
import * as S from "./styles";
import { customerInfo, contactsInfo } from "./data";

const Footer = () => {
  return (
    <S.Footer className="container">
      <S.ContactsWrapper>
        {customerInfo &&
          customerInfo.map((item, index) => (
            <S.ContactItem key={`${item.name} ${index}`} href={item.link}>
              {item.name}
            </S.ContactItem>
          ))}

        {contactsInfo &&
          contactsInfo.map((item, index) => (
            <S.ContactItem key={`${item.name} ${index}`} href={item.link}>
              {item.name}
            </S.ContactItem>
          ))}
      </S.ContactsWrapper>
        <S.InfoBlock>
          <S.InfoText>Ми знаходимось у м.Ужгород за адресами: </S.InfoText>
          <S.InfoText> *  вул.Корзо, 10 </S.InfoText>
          <S.InfoText> * вул.Заньковецької, 2 </S.InfoText>
          <S.InfoText> Комфортна примірка в магазині, доставка по Україні </S.InfoText>
          <S.InfoText> Дзвоніть за телефонами: +380506665992 або +380506927217 </S.InfoText>
        </S.InfoBlock>
    </S.Footer>
  );
};

export default Footer;
