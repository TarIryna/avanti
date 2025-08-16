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

export const SearchInput = styled.input`
  display: block;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: rgb(229 231 235);
  background-color: rgb(255 255 255);
  padding: 5px 16px;
  font-family: Satoshi, sans-serif;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  margin-left: auto;
  width: 300px;
  @media screen and (max-width: 1024px) {
    height: 40px;
  }
  @media screen and (max-width: 540px) {
    height: 30px;
    width: 200px;
    font-size: 12px;
  }
`;
