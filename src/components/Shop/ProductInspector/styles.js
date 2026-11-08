import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const PageTitle = styled.h1`
  margin: 0 0 20px;
  text-align: center;
  font-size: 24px;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  max-width: 760px;
  margin: 0 auto 20px;
  ${media.mobile} { flex-direction: column; }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 44px;
  padding: 0 14px;
  border: 1px solid #aeb5c0;
  border-radius: 8px;
  font-size: 16px;
`;

export const SearchButton = styled.button`
  min-width: 110px;
  border: 0;
  border-radius: 8px;
  padding: 0 20px;
  color: white;
  background: #252a34;
  cursor: pointer;
  &:disabled { opacity: .55; cursor: default; }
  ${media.mobile} { min-height: 42px; }
`;

export const PageActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  max-width: 760px;
  margin: -8px auto 20px;
`;

export const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px;
  max-width: 1000px;
  margin: 0 auto 20px;
`;

export const ResultButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
  padding: 10px;
  text-align: left;
  border: 1px solid #d2d6dc;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;

export const ProductCard = styled.article`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #d9dde3;
  border-radius: 12px;
  background: #fff;
  ${media.mobile} { padding: 14px; }
`;

export const ProductHeading = styled.h2`
  margin: 0 0 16px;
  font-size: 22px;
`;

export const ProductTop = styled.div`
  display: grid;
  grid-template-columns: ${({ hasImage }) => hasImage ? "minmax(160px, 240px) minmax(0, 1fr)" : "minmax(0, 1fr)"};
  align-items: start;
  gap: 16px;
  ${media.mobile} { grid-template-columns: 1fr; }
`;

export const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  border-radius: 8px;
  background: #f7f7f7;

  img { object-fit: contain; }
`;

export const ProductInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  padding: 10px;
  border: 1px solid #e0e3e8;
  border-radius: 8px;
  overflow-wrap: anywhere;
`;

export const InfoLabel = styled.span`
  color: #667085;
  font-size: 12px;
`;

export const StockHeading = styled.h3`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin: 22px 0 10px;
  font-size: 18px;
`;

export const Total = styled.span`
  color: #344054;
  font-size: 14px;
  font-weight: 500;
`;

export const Stores = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  ${media.mobile} { grid-template-columns: 1fr; }
`;

export const StoreCard = styled.section`
  min-width: 0;
  padding: 12px;
  border: 1px solid #e0e3e8;
  border-radius: 8px;
  overflow-x: auto;
`;

export const StoreHeading = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  span { white-space: nowrap; color: #475467; }
`;

export const NoStock = styled.p`
  margin: 0;
  color: #667085;
`;

export const PrintActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

export const ActionButton = styled.button`
  min-height: 42px;
  padding: 8px 16px;
  border: 1px solid #252a34;
  border-radius: 8px;
  color: white;
  background: #252a34;
  cursor: pointer;
  &:disabled { opacity: .55; cursor: default; }
`;

export const BarcodeAction = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  label { font-size: 14px; }
`;

export const AmountInput = styled.input`
  width: 78px;
  height: 42px;
  padding: 0 8px;
  border: 1px solid #aeb5c0;
  border-radius: 8px;
  font-size: 16px;
`;
