import { media } from "@/styles/mediaBrakepoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Title = styled.h4`
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
`

export const Form = styled.form`
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`


export const CheckButton = styled.button`
    min-height: 50px;
    min-width: 200px;
    padding: 5px 40px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    border-radius: 16px;
    border: 1px solid grey;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`