import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const List = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    `

export const MediaCopy = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;

    button {
        border: 1px solid black;
        padding: 8px 14px;
        border-radius: 16px;
        background: white;
        cursor: pointer;
    }

  @media screen and (max-width: 767px) {
    align-items: stretch; flex-direction: column; > * { min-width: 0; width: 100%; }
  }
`
export const Flex = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 20px;

    div {
    max-width: 400px;
    }

    ${media.mobile}{
        gap: 8px;
        margin-bottom: 10px;
    }

  @media screen and (max-width: 767px) {
    flex-direction: column; > div { max-width: 100%; min-width: 0; }
  }
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

  @media screen and (max-width: 767px) {
    width: 100%; min-width: 0;
  }
`

export const ImageWrapper = styled.div`
    width: 400px;
    height: 400px;
    position: relative;

    img {
    max-width: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: contain;
  }

  @media screen and (max-width: 767px) {
    width: 100%; max-width: 400px; height: auto; aspect-ratio: 1;
  }
`
export const ButtonsWrapper = styled.div`
    width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 6px;

  @media screen and (max-width: 767px) {
    width: 100%; > button { width: 100%; }
  }
`
