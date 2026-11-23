import styled from "@emotion/styled";

export const GoogleBtn = styled.button`
  text-decoration: none;
  padding: 8px 16px;
  width: 100%;
  height: 44px;
  background: white;
  border-radius: 16px;
  border: 1px solid black;
  display: flex;
  gap: 10px;
  justify-content: center;

  @media screen and (max-width: 767px) {
    height: auto; min-height: 44px; max-width: 100%; align-items: center; padding: 8px 10px;
  }
`;
