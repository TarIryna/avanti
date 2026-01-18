import styled from "@emotion/styled";

export const Line = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;

  p {
    &:first-of-type {
      font-weight: 600;
    }
    &:last-of-type {
      font-weight: 400;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
