import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Wrapper = styled.div`
  display: flex;
  border-radius: 16px;
  ${media.mobile} {
    border-radius: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  background: rgb(229, 229, 229);
  border-radius: 16px;
  overflow-y: auto;
  ${media.mobile} {
    height: 100dvh;
    width: 100vw;
    min-height: auto;
    border-radius: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 24px 16px 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  ${media.mobile} {
    padding: 0 16px 16px 16px;
  }
`;

export const Link = styled.div`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin: 0 auto;
`;
