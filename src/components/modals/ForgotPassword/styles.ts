import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  input {
    background: white;
    max-width: 100%;
  }
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;
