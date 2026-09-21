
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

export const ImageCard = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    transform: translate3d(0, 0, 0);
  }
`;

export const SizesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SizesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 6px;
`;

export const SizesBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 40px;
  padding: 0 5px;
  text-align: center;
  transition: 0.1s linear;
  font-weight: 400;

`;

export const SizesButton = styled.button`
  border-radius: 8px;
  border: 0.5px grey solid;
  padding: 2px 10px;
  margin: 10px auto 0;
  width: 220px;
  background: rgb(33, 32, 32);
  color: white;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  div {
    width: 40px;
  }

  input {
    padding: 4px;
    text-align: center;
  }
`

export const Quantity = styled.div`
  border-radius: 16px;
  border: 0.5px solid grey;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  height: 44px;
  width: 44px;
  margin-top: 36px;
`

export const Button = styled.button`
  border-radius: 16px;
  border: 0.5px solid grey;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  height: 44px;
  width: max-width;
  padding: 0 12px;
  margin-top: 36px;
`

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: end;
  height: 40px;
  gap: 10px;
`

export const ItemImageCard = styled(ImageCard)`
  width: 40px;
  height: 100%;
`