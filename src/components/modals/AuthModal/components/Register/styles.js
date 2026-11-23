import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 767px) {
    width: 100%; min-width: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;

  @media screen and (max-width: 767px) {
    width: 100%; flex-direction: column; gap: 12px;
  }
`;
