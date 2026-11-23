import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid darkgrey;
  border-top: 1px solid darkgrey;

  @media screen and (max-width: 767px) {
    gap: 12px; padding: 10px 0; align-items: flex-start; min-width: 0;
  }
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

  @media screen and (max-width: 767px) {
    min-width: 0; flex: 1; overflow-wrap: anywhere; img { margin-left: 0; }
  }
`;

export const ProductLink = styled.a`
  width: fit-content;
  color: inherit;
  cursor: pointer;
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

  @media screen and (max-width: 767px) {
    width: 90px; height: 110px; flex: 0 0 90px;
  }
`;

export const Text = styled.div`
    font-size: 14px;
    font-weight: 400;
    ${({isPointer}) => ( isPointer && 'cursor: pointer;')}
    ${({isBold}) => ( isBold && 'font-weight: 600; color: red;')}
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

  @media screen and (max-width: 767px) {
    width: 28px; height: 28px; flex-shrink: 0;
  }
`
