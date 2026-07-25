import { media } from "@/styles/mediaBrakepoints";
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
export const MenuButton = styled.div`
    height: 36px;
    border-radius: 14px;
    cursor: pointer;
    font-size: 20px;
    border: 1px solid grey;
    padding: 0 16px;
     ${media.mobile}{
        font-size: 16px;
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

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
    width: 600px;
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
    ${({red}) => ( red && 'color: red; text-decoration: line-through;')}
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
`

export const CheckContainer = styled.div`

`

export const ButtonsConatainer = styled.div`
        display: flex;
        gap: 10px;
        margin-top: 10px;
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

export const Flex = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
`

export const Row = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`
export const ListRevalue = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;   
`

export const Input = styled.input`
    border-radius: 16px;
    border: 1px solid grey;
    padding: 0 10px;
    height: 40px;
`

export const ImagesList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 12px; 
    background-color: #f9fafb;

    .imageCard {  
        width: 250px;
        height: 300px;       
        border: 2px solid #d1d5db;  
        border-radius: 8px;
        overflow: hidden;
        cursor: grab; 
        background-color: #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
                    0 1px 2px -1px rgba(0, 0, 0, 0.1); /* shadow-sm */
        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1); /* transition-transform */
        position: relative;

            img {
                object-position: center;
                object-fit: contain;
            }

        .deleteButton {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 24px;
            height: 24px;
            background-color: rgba(239, 68, 68, 0.9); /* Красный цвет */
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 16px;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: background-color 0.2s;
            padding-bottom: 3px;
            }
        }

        /* active:cursor-grabbing */
        .imageCard:active {
        cursor: grabbing;
        }

        /* hover:scale-105 */
        .imageCard:hover {
        transform: scale(1.05);
        }
`

export const VideoContainer = styled.div`
    display: flex;
    gap: 10px;
`