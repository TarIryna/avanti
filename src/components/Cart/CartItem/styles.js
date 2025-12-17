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
`