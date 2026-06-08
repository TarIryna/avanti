import styled from "@emotion/styled";

export const SalePrice = styled.div`
  color: red;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export const LastPrice = styled.span`
  text-decoration: line-through;
  color: black;
  font-size: 18px;
  font-weight: 600;
`;

export const CardWrapper = styled.div`
  min-height: 300px;
  border: 1px solid grey;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px 0;
  cursor: pointer;
`;

export const Title = styled.h3`
  font-weight: 600;
  font-size: 14px;
  padding: 0 4px;
`;

export const ImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: contain;
  }
`;
export const Flex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 10px;
`

export const DiscountMessage = styled.div`
  border-radius: 50%;
  border: 0.8px solid red;
  color: red;
  font-size: 14px;
  padding: 5px 10px;
  position: absolute;
  right: -120%;
  top: 8%;
  width: max-content;
`

export const PriceWrapper = styled.div`
  margin-top: 10px;
  position: relative;
   .discount {
    top: 21%;
    right: -40%;
    font-size: 10px;
  }
`;

export const PriceContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 position: relative;
`

export const Text = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`

export const SaleCardWrapper = styled.div`
  // display: flex;
`

export const Price  =styled.div`
    font-size: 24px;
    font-weight: 600;
    ${({red}) => ( red && css`
        color: red;
        text-decoration: line-through;
        `)}
`

export const Info = styled.div``