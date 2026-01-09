"use client";
import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";
import { css } from "@emotion/react";
import Image from "next/image";
import { Container, Content } from "../styles";

const buttonStyles = css`
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, 0, 0);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LeftButton = styled.div`
${buttonStyles};
  left: 40px;
  svg {
    transform: rotate(180deg);
  }
`

export const RightButton = styled.div`
${buttonStyles};
  right: 0;
`

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slider = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  width: 100%;
  height: 100%;
`;

export const ImageCard = styled.div`
  flex: 0 0 100%; 
  height: 100%;
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

export const Length = styled.div`
  font-size: 14px;
  color: grey;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
`
export const Description = styled.div`
  width: fit-content;
  margin: 0 auto;
  ${media.mobile}{
    width: 100%;
  }
`

export const Back = styled(Image)`
  position: absolute;
  left: 16px;
  top: 16px;
`

export const ContainerProduct = styled(Container)`
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  background: white;
  position: relative;
`

export const ContentProduct = styled(Content)`
   height: 100%;
`
