"use client";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";

const galleryGrid = css`
  display: grid;
  grid-template-columns: 200px auto;
  gap: 15px;
  max-height: calc(100dvh - 100px);
`;
const galleryFlex = css`
  display: flex;
  gap: 15px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 10px 10px 20px 10px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
`;

export const ProductSizes = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const SizesContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  height: 30px;
  margin-top: 10px;
`;

export const SizesBlock = styled.div`
  width: 30px;
  border: 1px solid grey;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  border: ${({ isActive }) =>
    isActive ? "3px solid black" : "1px solid grey"};
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

export const DescriptionTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const DescriptionPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

export const DescriptionValue = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const GallerySmallImage = styled(Image)`
  border: 0.2px solid grey;
`;
export const GallerySmallWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  > img {
    cursor: pointer;
  }
`;

export const GalleryWrapper = styled.div`
  ${({ isGrid }) => (isGrid ? galleryGrid : galleryFlex)}
`;
