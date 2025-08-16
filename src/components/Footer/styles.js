import styled from "@emotion/styled";
import Link from "next/link";

export const Footer = styled.footer`
  background: black;
  color: white;
  width: 100%;
  height: 120px;
  display: flex;
  gap: 80px;
`;
export const ContactsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(2, 24px);
  gap: 10px;
  padding: 30px 0;
`;
export const ContactItem = styled(Link)`
  color: white;
  font-weight: 500;
  font-size: 14px;
  height: 20px;
`;
