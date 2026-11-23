import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
    display: flex;
    gap: 16px;

  @media screen and (max-width: 767px) {
    flex-wrap: wrap; gap: 8px;
  }
`   
