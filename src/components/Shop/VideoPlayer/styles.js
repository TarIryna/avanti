import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: black;
  border-radius: 16px;
  overflow: hidden;
  height: 600px;
  width: 326px;
  margin: 0 auto;
  ${media.mobile}{
  width: 100vw;
  height: 80vh;
  }
  `

export const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  max-height: 600px;
`