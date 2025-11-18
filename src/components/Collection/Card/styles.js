import styled from "@emotion/styled";

export const SalePrice = styled.span`
  color: red;
  font-size: 25px;
  font-weight: 600;
  margin-left: 10px;
`;

export const LastPrice = styled.span`
  text-decoration: line-through;
  color: black;
  font-size: 25px;
  font-weight: 600;
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
`;

export const Title = styled.h3`
  font-weight: 600;
  font-size: 18px;
  padding: 0 6px;
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
`;

export const PriceWrapper = styled.div`
  margin-top: 10px;
`;
