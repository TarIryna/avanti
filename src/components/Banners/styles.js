import styled from "@emotion/styled";
import Link from "next/link";

export const BannersWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin: 20px 0;
`;

export const BannerCard = styled.div`
  width: 23vw;
  aspect-ratio: 1.25;
  position: relative;
  img {
    width: 100%;
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
