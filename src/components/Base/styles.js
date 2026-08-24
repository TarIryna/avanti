import { media } from "@/styles/mediaBrakepoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
    height: 90px;
    width: 100%;
    border-radius: 14px;
    cursor: pointer;
    font-size: 30px;
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 20px 0;
    width: 600px;

    ${media.desktopMd}{
     grid-template-columns: repeat(3, 1fr);
    }
     ${media.tablet}{
     grid-template-columns: repeat(2, 1fr);
    }
      ${media.mobile}{
     grid-template-columns: repeat(1, 1fr);
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

export const ButtonsConatainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
`

export const ListRevalue = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;   
`


//  SizesInfo

export const ProductSizes = styled.p`
  text-align: center;
`;

export const SizesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  ${({isNotification}) => (isNotification && css`
    border: 1px solid red;
    border-radius: 16px;
    `)}
`;

export const SizesBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 5px;
  text-align: center;
  transition: 0.1s linear;
  font-weight: 400;

  min-width: ${({isSmall}) => (isSmall ? ' 16px' : ' 40px')};
`;

export const SizeContainer = styled.div`
 height: max-content;

`

export const OneSize = styled(SizesBlock)`
  width: fit-content;
  padding: 2px 10px;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
`

export const SizesButton = styled.button`
  border-radius: 8px;
  border: 0.5px grey solid;
  padding: 2px 10px;
  margin: 10px auto 0;
  width: 220px;
  background: rgb(33, 32, 32);
  color: white;
`;

export const ShopSizesList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
`;

export const ShopTitle = styled.div`
  color: #2d3748;
  margin-top: 2px;
  text-align: left;
  width: ${({isSmall}) => (isSmall ? '11px' : '165px')};
`;

export const ShopGroupBlock = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px dashed #e2e8f0;
  padding-bottom: 8px;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const SizesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  p, div {
      ${({isSmall}) => ( isSmall ? `
      font-size: 7px;
      font-weight: 500;
    `: 
  `  font-size: 16px;
     font-weight: 500;
  `)}
  }
  
`;

