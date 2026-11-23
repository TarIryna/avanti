import styled from "@emotion/styled";

export const TabsWrapper = styled.div`
  display: flex;
  height: 44px;
  border-radius: 16px;
  overflow: hidden;

  @media screen and (max-width: 767px) {
    max-width: 100%; height: auto; min-height: 44px; overflow-x: auto; > * { flex-shrink: 0; }
  }
`;
