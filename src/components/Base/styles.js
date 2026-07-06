import { media } from "@/styles/mediaBrakepoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";

export const Title = styled.h4`
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
`

export const MenuList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0 auto;
    gap: 16px;
    padding: 0 60px;
    ${media.mobile}{
        padding: 0 16px;
    }
`

export const MenuShopButton = styled.div`
    height: 150px;
    width: 100%;
    border-radius: 14px;
    cursor: pointer;
    font-size: 40px;
    font-weight: 600;
    border: 1px solid grey;
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center; 
    text-align: center;
`
