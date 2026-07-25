import styled from "@emotion/styled";

export const ImageContainer = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 16px;
    border: 1px dotted grey;
    position: relative;

    img {
        object-position: center;
        object-fit: contain;
    }
    `