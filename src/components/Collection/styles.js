import styled from "@emotion/styled";

export const CardWrapper = styled.div`
  min-height: 450px;
  border: 1px solid grey;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h3`
  font-weight: 600;
  font-size: 20px;
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
