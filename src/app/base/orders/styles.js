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
`