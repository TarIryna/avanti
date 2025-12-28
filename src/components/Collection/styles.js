import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

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
  ${media.mobile} {
    height: 30px;
    font-size: 12px;
    width: 160px;
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CollectionSearch = styled(SearchInput)`
  margin: 0 auto 20px;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;

export const LimitPageWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: 540px) {
    justify-content: space-between;
  }

  select {
    border: 1px solid grey;\
    padding: 2px 10px;
    border-radius: 12px;
    height: 34px;
  }
`;

export const FilterTitle = styled.h3`
  text-align: center;
  font-weight: 800;
  margin-bottom: 6px;
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 540px) {
    grid-template-columns: repeat(2, 50%);
    column-gap: 4px;
  }
    select {
      background: white;
    }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
`

export const SearchWrapper = styled.div`
  position: relative;
  margin-left: auto;
  `
