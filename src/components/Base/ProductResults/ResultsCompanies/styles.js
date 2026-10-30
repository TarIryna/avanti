import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";

export const PrintGlobalStyles = createGlobalStyle`
  @media print {
    @page { size: A4 portrait; margin: 8mm; }

    body * { visibility: hidden !important; }
    .supplier-print-root,
    .supplier-print-root * { visibility: visible !important; }

    body > .main { display: none !important; }

    .app {
      position: static !important;
      width: auto !important;
      height: auto !important;
      min-height: 0 !important;
      max-width: none !important;
      overflow: visible !important;
      margin: 0 !important;
    }

    .app > :not(section.container.page) { display: none !important; }

    section.container.page {
      width: auto !important;
      max-width: none !important;
      min-height: 0 !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    section.container.page > :not(.supplier-print-root) { display: none !important; }

    .supplier-print-root {
      position: static !important;
      display: block !important;
      width: 194mm !important;
      max-width: none !important;
      margin: 0 !important;
    }

    .supplier-print-table-wrapper {
      width: 194mm !important;
      overflow: visible !important;
      border: 0 !important;
      border-radius: 0 !important;
    }

    .supplier-print-table {
      width: 100% !important;
      min-width: 0 !important;
      table-layout: fixed !important;
      font-size: 8pt !important;
    }

    .supplier-print-table th,
    .supplier-print-table td {
      padding: 1.5mm 1mm !important;
      white-space: normal !important;
      overflow-wrap: anywhere !important;
      border: 0.2mm solid #888 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .supplier-print-table th:nth-child(1), .supplier-print-table td:nth-child(1) { width: 48mm; }
    .supplier-print-table th:nth-child(2), .supplier-print-table td:nth-child(2),
    .supplier-print-table th:nth-child(3), .supplier-print-table td:nth-child(3) { width: 19mm; }
    .supplier-print-table th:nth-child(4), .supplier-print-table td:nth-child(4),
    .supplier-print-table th:nth-child(5), .supplier-print-table td:nth-child(5),
    .supplier-print-table th:nth-child(6), .supplier-print-table td:nth-child(6) { width: 22mm; }
    .supplier-print-table th:nth-child(7), .supplier-print-table td:nth-child(7),
    .supplier-print-table th:nth-child(8), .supplier-print-table td:nth-child(8) { width: 21mm; }

    .supplier-print-table thead { display: table-header-group; }
    .supplier-print-table tr { break-inside: avoid; page-break-inside: avoid; }
  }
`;

export const FilterForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 20px 0;
`;

export const SubmitButton = styled.button`
  min-height: 42px;
  padding: 8px 18px;
  border: 1px solid #777;
  border-radius: 12px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;

  &:disabled { cursor: wait; opacity: 0.6; }
`;

export const Status = styled.div`
  padding: 10px 0;
  text-align: center;
`;

export const PrintButton = styled.button`
  min-height: 40px;
  margin: 0 0 12px;
  padding: 8px 16px;
  border: 1px solid #777;
  border-radius: 12px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;

  &:disabled { cursor: not-allowed; opacity: 0.5; }
`;

export const PrintArea = styled.div``;

export const PrintHeading = styled.h2`
  display: none;

  @media print {
    display: block;
    margin: 0 0 5mm;
    color: #000;
    font-size: 14pt;
    text-align: center;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const ResultsTable = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  text-align: center;
  font-size: 13px;

  th, td {
    padding: 10px 12px;
    border: 1px solid #ddd;
    white-space: nowrap;
  }

  thead, tfoot { background: #f4f4f4; }
  tfoot { font-weight: 700; }
  tbody tr:nth-of-type(even) { background: #fafafa; }

  @media print {
    min-width: 0;
    font-size: 9pt;

    th, td { padding: 4px; }
  }
`;

export const ProfitCell = styled.td`
  font-weight: 700;
  color: ${({ $value }) => ($value < 0 ? "#c62828" : $value > 0 ? "#2e7d32" : "inherit")};
`;
