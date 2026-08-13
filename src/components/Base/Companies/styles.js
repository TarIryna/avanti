import { media } from "@/styles/mediaBrakepoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Form = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 400px);
    gap: 10px;
    padding: 20px 0;
    width: 600px;

      ${media.mobile}{
     grid-template-columns: repeat(1, 1fr);
    }

    button {
    min-height: 40px;
    }
`

