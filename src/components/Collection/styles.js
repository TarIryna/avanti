import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const SearchInput = styled.input`
  display: block;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgb(229 231 235);
  background-color: rgb(255 255 255);
  padding: 5px 33px 5px 10px;
  font-family: Satoshi, sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin-left: auto;
  width: 300px;
  @media screen and (max-width: 1024px) {
    height: 40px;
  }
  ${media.tabletMd} {
    height: 30px;
    padding: 5px 20px 5px 10px;
    width: calc(100vw - 250px);
    text-overflow: ellipsis;
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

   select {
      background: white;
    }
    select.filter__select_current {
    font-weight: 700;
    }
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
   
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
   ${media.tabletMd} {
    width: 16px;
    height: 16px;
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  margin-left: auto;
  `

  export const Select = styled.select`
  font-weight: 400;
  ${(isCurrent) => (isCurrent && 'font-weight: 700;')}
  `