import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    border-radius: 16px;
    border: 0.5px solid grey;

  @media screen and (max-width: 767px) {
    min-width: 0; align-items: flex-start; padding: 8px;
  }
`

export const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: contain;
  }

  @media screen and (max-width: 767px) {
    width: 70px; height: 80px; flex: 0 0 70px;
  }
`;

export const Info = styled.div`
    font-size: 10px;

  @media screen and (max-width: 767px) {
    min-width: 0; padding: 0; overflow-wrap: anywhere;
  }
`

export const Text = styled.div`
    font-weight: 400;
`

export const Price = styled.div`
    font-weight: 500;
    font-size: 14px;
`

export const NewPrice = styled(Price)`
    color: red;
`