import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: min(900px, calc(100vw - 40px));
  height: min(780px, calc(100vh - 60px));
  background: rgb(229, 229, 229);
  border-radius: 16px;

  ${media.mobile} {
    width: 100vw;
    height: 100dvh;
    border-radius: 0;
  }
`;

export const Summary = styled.p`
  width: 100%;
  box-sizing: border-box;
  margin: 0 20px 12px;
  font-weight: 600;
`;

export const Message = styled.p`
  margin: 20px;
`;

export const Error = styled.p`
  margin: 6px 0;
  color: #b00020;
`;

export const List = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding: 0 20px 16px;
`;

export const Item = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;

  input {
    flex: 0 0 auto;
    width: 18px;
    height: 18px;
  }
`;

export const Image = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  background: #f5f5f5;
  border-radius: 6px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Actions = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 12px 20px;
`;
