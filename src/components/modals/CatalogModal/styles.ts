import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";
import { styles } from "@/data";

export const List = styled.div`
  padding: 0 6px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Container = styled.div``

export const Text = styled.div``

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: white;
`;

export const CardWrapper = styled.div`
  width: calc(100vw - 50px);
  aspect-ratio: 0.66;
  border: 1px solid grey;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px 0;
  cursor: pointer;
`;

export const Title = styled.h3`
  font-weight: 600;
  font-size: 14px;
  padding: 0 4px;
`;

export const Flex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 10px;
`

export const ImageWrapper = styled.div`
  width: 900px;
  height: 1000px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: contain;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 10px;
  position: relative;
`;

export const PriceContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 position: relative;
`

export const SalePrice = styled.div`
  color: red;
  font-size: 60px;
  font-weight: 600;
  text-align: center;
`;

export const LastPrice = styled.span`
  text-decoration: line-through;
  color: black;
  font-size: 60px;
  font-weight: 600;
`;