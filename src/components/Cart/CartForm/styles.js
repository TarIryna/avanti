import styled from "@emotion/styled";

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr); gap: 12px;
  }
`;
