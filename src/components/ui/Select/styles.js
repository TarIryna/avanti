import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SelectContainer = styled.select`
  border-radius: 16px;
  font-weight: 400;
  font-size: 16px;
  padding: 0px 16px;
  border: 1px solid grey;
  height: 40px;
  option {
    border-radius: 16px;
  }
  &:focus {
  outline: none;
  box-shadow: none; /* иногда тень добавляется для контура */
  border-color: initial; /* если нужно убрать изменение цвета рамки */
}
`