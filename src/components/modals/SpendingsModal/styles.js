
import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 10px;

  div {
    width: 100%;
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
.invoice {
  width: 100px;
  margin-top: 36px;
  background: white;
  border-radius: 14px;
}
`


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 120px);
  height: calc(100vh - 120px);
  background: rgb(229, 229, 229);
  border-radius: 16px;
  ${media.mobile} {
    height: 100dvh;
    width: 100vw;
    min-height: auto;
    border-radius: 0;
    overflow: hidden;
    overflow-y: auto;
  }
`;

export const Wrapper = styled.div`
  font-size: 14px;
  width: 100%;
  .invoice-select {
    width: 30%;
  }

`

export const Text = styled.div`
  height: 33px;
  background: white;
  padding: 5px;
  width: max-content;
  border-radius: 14px;
  margin-bottom: 5px;
`