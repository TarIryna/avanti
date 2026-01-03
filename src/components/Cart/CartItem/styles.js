import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid darkgrey;
  border-top: 1px solid darkgrey;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  img {
    margin-left: 20px;
    margin-top: 10px;
  }
`;

export const ImageWrapper = styled.div`
  width: 250px;
  height: 200px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

export const Text = styled.div`
    font-size: 14px;
    font-weight: 400;
    ${({isPointer}) => ( isPointer && 'cursor: pointer;')}
    display: flex;
    align-items: center;
    justify-content: center;
`

export const QuantityButton = styled.div`
  border: 0.5px solid grey;
  border-radius: 10px;
  margin: 0 5px;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`