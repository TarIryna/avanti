import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const ForgotPassButton = styled.button`
  position: relative;
  width: fit-content;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 20px;
  margin-left: 16px;
  color: black;
  text-decoration: underline;
  &:before {
    opacity: 0;
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: var(--ost-green-gradient);
    transition: opacity 0.3s ease;
  }
  ${media.hover} {
    &:hover {
      &:before {
        opacity: 1;
      }
    }
  }
`;

export const SubmitButton = styled.button`
  border: 1px solid black;
  border-radius: 16px;
  width: 100%;
  height: 44px;
  background: white;
`;
