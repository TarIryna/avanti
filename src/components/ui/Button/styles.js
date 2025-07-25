import { css } from "@emotion/react";
import styled from "@emotion/styled";

const buttonStyles = css`
  border: 1px solid black;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 16px;
  background: white;
`;

export const StyledButton = styled.button`
  &[type="button"],
  &[type="reset"],
  &[type="submit"] {
    ${buttonStyles}
  }
  ${buttonStyles}
`;
