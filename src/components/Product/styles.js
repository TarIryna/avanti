"use client";
import { media } from "@/styles/mediaBrakepoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";

export const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 570px;
  align-items: center;
  gap: 20px;
  padding: 20px;
  ${media.tabletMd} {
     grid-template-columns: 1fr;
     gap: 16px;
     padding: 0;
  }
`;

export const Content = styled.div`
  padding: 20px 50px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${media.mobile}{
    padding: 16px;
  }
`;

export const Name = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const ButtonAsk = styled.div`
  border-radius: 8px;
  border: 0.5px grey solid;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SizesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ProductSizes = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const SizesContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  margin-top: 10px;
  ${({isNotification}) => (isNotification && css`
    border: 1px solid red;
    border-radius: 16px;
    `)}
`;

export const SizesBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  text-align: center;
  transition: 0.1s linear;
  &:not(:last-child){
    border-right: 1px solid grey;
    }
  font-weight: ${({ isActive }) =>
    isActive ? "900" : "400"};
  ${({ isOne}) =>
    isOne && "border-right: 1px solid grey; border-left: 1px solid grey;"};
`;

export const OneSize = styled(SizesBlock)`
  width: fit-content;
  padding: 2px 10px;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
`

export const SizesButton = styled.button`
  border-radius: 8px;
  border: 0.5px grey solid;
  padding: 2px 10px;
  margin: 10px auto 0;
  width: 220px;
  background: rgb(33, 32, 32);
  color: white;
`;

export const DescriptionTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const DescriptionPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding-left: 10px;
  ${({isPrice}) => (isPrice && css`
    color: red;
    `)}
  ${({isFirst}) => (isFirst && css`
    text-decoration: line-through;
    `)}
`;

export const DescriptionValue = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const GalleryWrapper = styled.div`
  height: 100%;
  position: relative;
  max-height: calc(100svh - 260px);
  width: 100%;
  ${media.mobile}{
    touch-action: pan-y;
  }
`;

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
  ${media.mobile}{
    width: 20px;
    height: 20px;
    svg {
      height: 14px;
    }
  }
`

export const LeftButton = styled.div`
${buttonStyles};
  left: 20px;
  svg {
    transform: rotate(180deg);
  }
  ${media.mobile}{
    left: 14px;
  }
`

export const RightButton = styled.div`
${buttonStyles};
  right: 20px;
   ${media.mobile}{
    right: 5px;
  }
`

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 40px;
  ${media.mobile}{
    padding: 0;
    }
`;

export const Padding = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
`

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
    cursor: pointer;
    ${media.mobile}{
      position: unset !important; 
    }
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

export const Notification = styled.div`
  position: absolute;
  left: 50%;
  top: 13px;
  transform: translate3d(-50%, 0, 0);
  color: red;
  text-align: center;
  width: max-content;
`