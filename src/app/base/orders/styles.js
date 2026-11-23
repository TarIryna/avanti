import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const ButtonsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    margin-top: 24px;

    a {
        font-size: 24px;
        font-weight: 600;
        padding: 20px;
        min-width: 300px;
        border-radius: 16px;
        border: solid 1px grey;
    }

  @media screen and (max-width: 767px) {
    width: 100%; a { min-width: 0; width: 100%; max-width: 100%; font-size: 20px; padding: 14px; overflow-wrap: anywhere; }
  }
`