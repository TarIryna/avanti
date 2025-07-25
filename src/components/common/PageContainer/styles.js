import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 1280px) {
    padding: 24px;
    gap: 24px;
  }
  @media screen and (max-width: 1024px) {
    padding: 16px;
    gap: 16px;
  }

  h2 {
    font-size: 24px;
    font-weight: 800;
    text-align: center;
  }
`;
