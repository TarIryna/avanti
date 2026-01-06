import styled from "@emotion/styled";
import Link from "next/link";

export const BannersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 767px) {
     gap: 8px;
  }
`;

export const BannerCard = styled.div`
  position: relative;
  img {
    width: 100%;
  }
  a {
    text-align: center;
  }
`;

export const BannerButton = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  padding: 10px;
  color: white;
  font-size: 16px;
  font-weight: 800;
  background: rgba(1, 1, 1, 0.5);
  border-radius: 16px;
  display: flex;
  justify-content: center;
`;
