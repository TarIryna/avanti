import styled from "@emotion/styled";

export const Title = styled.h4`
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
`

export const Panel = styled.div`
  margin: 20px 0;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: grid;
  gap: 12px;
  p { line-height: 1.5; }
  @media (max-width: 640px) {
    padding: 12px;
    gap: 8px;
    font-size: 13px;
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 12px;
  margin: 12px 0;
  label { display: grid; gap: 6px; font-size: 14px; }
  input, select { padding: 8px; border: 1px solid #aaa; border-radius: 4px; }
  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    label, input, select, button { min-width: 0; width: 100%; }
    label { font-size: 12px; }
    input, select { box-sizing: border-box; }
    button { white-space: normal; }
  }
`;

export const Message = styled.div`
  display: grid;
  gap: 8px;
  padding: 12px 0;
  line-height: 1.5;
`;

export const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;
  th, td { padding: 12px; border: 1px solid #ddd; text-align: left; vertical-align: middle; }
  th { background: #f3f3f3; }
  tbody tr:nth-of-type(even) { background: #fafafa; }
  @media (max-width: 640px) {
    display: block;
    min-width: 0;
    thead { display: none; }
    tbody { display: grid; gap: 12px; }
    tbody tr {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    td {
      min-width: 0;
      padding: 8px;
      border: 0;
      border-top: 1px solid #eee;
      text-align: center;
      font-size: 14px;
    }
    td::before {
      content: attr(data-label);
      display: block;
      margin-bottom: 4px;
      font-size: 11px;
      color: #666;
    }
    td:first-of-type { grid-column: 1 / -1; padding: 12px; border-top: 0; text-align: left; }
    td:first-of-type::before { display: none; }
  }
`;

export const Product = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img { object-fit: contain; flex-shrink: 0; }
  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: 55px minmax(0, 1fr);
    gap: 10px;
    > img { grid-column: 1; grid-row: 1; }
  }
`;

export const ProductInfo = styled.div`
  overflow-wrap: anywhere;
  @media (max-width: 640px) { grid-column: 2; grid-row: 1; }
`;

export const StockOverview = styled.div`
  margin-left: auto;
  padding-left: 12px;
  display: grid;
  gap: 4px;
  @media (max-width: 640px) {
    grid-column: 1 / -1;
    min-width: 0;
    margin-left: 0;
    padding: 8px 0 0;
    border-left: 0;
    overflow-x: auto;
  }
`;

export const StockRow = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 6px;
  align-items: center;
  > strong { font-size: 12px; }
  @media (max-width: 640px) { width: max-content; min-width: 100%; }
`;

export const SizeList = styled.div`
  display: flex;
  gap: 2px;
`;

export const SizeBadge = styled.span`
  padding: 2px 3px;
  display: inline-flex;
  align-items: baseline;
  border-radius: 3px;
  background: ${({ highlighted }) => highlighted ? '#e7f2fc' : 'transparent'};
  color: ${({ highlighted }) => highlighted ? '#245b88' : 'inherit'};
  font-size: 13px;
  line-height: 1.1;
  white-space: nowrap;
  small {
    margin-left: 1px;
    font-size: 9px;
    line-height: 1;
    color: #666;
    position: relative;
    top: 3px;
  }
  ${({ empty }) => empty && `
    color: #dedede;
    background: transparent;
    small { color: #dedede; }
  `}
  @media (max-width: 640px) { padding: 2px; }
`;

export const DefectMark = styled.span`
  color: #854000;
`;

export const RecommendationLine = styled.div`
  line-height: 1.5;
`;
