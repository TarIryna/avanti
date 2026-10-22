import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const SizesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SizesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

export const SizesBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 40px;
  padding: 0 5px;
  text-align: center;
  transition: 0.1s linear;

  input {
    padding: 1px 0 1px 12px;
    text-align: center;
    height: 20px;
  }
`;

export const Shop = styled.div`
    font-size: 14px;
    font-weight: 600;
`

export const SizeContainer = styled.div`
 height: max-content;
 position: relative;
  ${({ isOne}) =>
    isOne && "border-right: 1px solid grey; border-left: 1px solid grey;"};

  &:not(:last-child){
    border-right: 1px solid grey;
    }
`

export const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  align-items: center;
  gap: 20px;
  padding: 110px 20px 20px;
  ${media.tabletMd} {
     grid-template-columns: 1fr;
     gap: 16px;
     justify-content: center;
  }

  h1{
    color: transparent;
    font-size: 2px;
    position: absolute;
  }
`;

export const Content = styled.div`
  padding: 20px 50px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${media.mobile}{
    padding: 16px;
  }
`;

export const Name = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const ButtonAsk = styled.div`
  border-radius: 8px;
  border: 0.5px grey solid;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductSizes = styled.p`
  ${({size}) => (size === 'lg' ? 'font-size: 16px;' : 'font-size: 10px;')}
  font-weight: 500;
  text-align: center;
`;

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

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 50px;
`