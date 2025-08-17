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
  @media screen and (max-width: 540px) {
    height: 30px;
    width: 200px;
    font-size: 12px;
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
    grid-template-columns: repeat(2, 1fr);
  }
`;
