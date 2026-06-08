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
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 16px;
    width: 500px;
`
export const MenuButton = styled.div`
    height: 36px;
    width: 100%;
    border-radius: 14px;
    cursor: pointer;
    font-size: 20px;
    border: 1px solid grey;
    width: 100%;
    padding: 0 16px;
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
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const InfoContainer = styled.div`
   display: flex;
    flex-direction: column;
    gap: 10px;
`

export const Text = styled.div`
    font-size: 16px;
    height: 40px;
    width: 100%;
    border: 1px solid grey;
    border-radius: 16px;
    position: relative;
    padding: 7px 10px 0;
`

export const Label = styled.div`
    position: absolute;
    top: 0;
    left: 18px;
    font-size: 8px;
`

export const PriceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export const Price  =styled.div`
    font-size: 30px;
    font-weight: 600;
    ${({red}) => ( red && css`
        color: red;
        text-decoration: line-through;
        `)}
`

export const SalePrice = styled.div`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    color: red;
`

export const ProductConatiner = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`
export const ImageWrapper = styled.div`
        width: 100%;
        position: relative;
        img {
            object-position: top center;
            object-fit: contain;
        }
`

export const CheckInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 200px;
    font-size: ${({ isSmall }) => (isSmall ? '10px' : '14px')};
    margin-bottom: 10px;
`

export const CheckText = styled.div`
    ${({bold}) => (bold && 'font-weight: 600;')}
`

export const CheckImageContainer = styled.div`
    width: 150px;
    height: 150px;
    position: relative;
`


export const CheckImage = styled(Image)`
    object-fit: contain;
`
export const CheckList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`

export const CheckButton = styled.button`
    height: 50px;
    min-width: 200px;
    padding: 5px 40px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    border-radius: 16px;
    border: 1px solid grey;
    margin-top: 20px;
`

export const CheckContainer = styled.div`

`

export const CheckTitle = styled.div`
   text-align: center;
   font-size: 24px;
   font-weight: 600;             
`
export const CheckTotal = styled(CheckTitle)`
    text-align: left;
`

export const List = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

    ${media.tablet}{
     grid-template-columns: repeat(3, 1fr);
    }
      ${media.mobile}{
     grid-template-columns: repeat(2, 1fr);
    }
`