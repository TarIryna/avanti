import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    text-decoration: underline;
    margin-bottom: 5px;
`

export const Form = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 300px);
    gap: 10px;
    width: 100%;

      ${media.mobile}{
     grid-template-columns: repeat(2, 1fr);
    }

    button {
    min-height: 40px;
    }
`

export const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`
export const Wrapper = styled.div`
    width: 100%;
    padding: 10px;
    border: 0.5px solid grey;
    border-radius: 14px;
    margin: 20px 0;
`
export const Table = styled.table`
    font-size: 12px;
    width: 100%;

    th, td {
    padding: 0 5px;
    text-align: center;
    }
    .cursor {
    cursor: pointer;
    }
`