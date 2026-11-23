import styled from "@emotion/styled";
import Link from "next/link";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  text-align: center;
`;

export const List = styled.div`
  margin-top: 24px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  button {
    max-width: 200px;
    margin-top: 16px;
  }

  @media screen and (max-width: 767px) {
    padding: 12px 0; gap: 8px;
  }
`;

export const Item = styled(Link)`
  font-size: 18px;
  font-weight: 400;
`;
