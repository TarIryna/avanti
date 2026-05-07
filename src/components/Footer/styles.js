import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";
import Link from "next/link";

export const Footer = styled.footer`
  background: black;
  color: white;
  width: 100%;
  min-height: 40px;
  display: flex;
  gap: 80px;
`;

export const ContactsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(2, 24px);
  gap: 10px;
  padding: 20px 0;
  ${media.tabletSm} {
    grid-template-columns: repeat(2, 200px);
    grid-template-rows: repeat(3, 24px);
  }
    ${media.mobile}{
    padding: 16px 0;
    width: 100%;
     grid-template-columns: repeat(2, 50%);
    }
`;
export const ContactItem = styled(Link)`
  color: white;
  font-weight: 500;
  font-size: 14px;
  height: 20px;
`;

export const InfoText = styled.p`
  font-weight: 400;
  font-size: 12px;
`

export const InfoBlock = styled.div`
  padding: 5px 0;
`