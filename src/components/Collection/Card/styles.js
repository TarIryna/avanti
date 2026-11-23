import styled from "@emotion/styled";

export const SalePrice = styled.span`
  color: red;
  font-size: 25px;
  font-weight: 600;
  margin-left: 10px;

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

export const LastPrice = styled.span`
  text-decoration: line-through;
  color: black;
  font-size: 25px;
  font-weight: 600;

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

export const CardWrapper = styled.div`
  min-height: 450px;
  border: 1px solid grey;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    min-width: 0; min-height: 0; padding-bottom: 16px;
  }
`;

export const Title = styled.h3`
  font-weight: 600;
  font-size: 18px;
  padding: 0 6px;

  @media screen and (max-width: 767px) {
    font-size: 16px; overflow-wrap: anywhere;
  }
`;

export const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: contain;
  }

  @media screen and (max-width: 767px) {
    width: 100%; max-width: 300px; height: auto; aspect-ratio: 1;
  }
`;


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

  @media screen and (max-width: 767px) {
    position: static; width: fit-content; max-width: 100%; margin: 4px auto;
  }
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
