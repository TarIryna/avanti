"use client";
import * as S from "./styles";
import { customerInfo, contactsInfo } from "./data";
const Footer = () => {
  return (
    <S.Footer className="container">
      {customerInfo && (
        <S.ContactsWrapper>
          {customerInfo.map((item, index) => (
            <S.ContactItem key={`${item.name} ${index}`} href={item.link}>
              {item.name}
            </S.ContactItem>
          ))}
        </S.ContactsWrapper>
      )}
      {contactsInfo && (
        <S.ContactsWrapper>
          {contactsInfo.map((item, index) => (
            <S.ContactItem key={`${item.name} ${index}`} href={item.link}>
              {item.name}
            </S.ContactItem>
          ))}
        </S.ContactsWrapper>
      )}
    </S.Footer>
  );
};
export default Footer;
