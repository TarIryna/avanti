import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { media } from "@/styles/mediaBrakepoints";

export const PrintGlobalStyles = createGlobalStyle`
  @media print {
    @page { size: A4 portrait; margin: 5mm; }

    body * { visibility: hidden !important; }
    .results-print-root, .results-print-root * { visibility: visible !important; }

    .results-print-root {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 200mm !important;
      max-width: none !important;
      max-height: none !important;
      min-height: 0 !important;
      height: auto !important;
      overflow: visible !important;
      border: 0 !important;
      border-radius: 0 !important;
    }

    .results-print-table {
      width: 200mm !important;
      min-width: 0 !important;
      table-layout: fixed !important;
      font-size: 6pt !important;
    }

    .results-print-table th,
    .results-print-table td {
      position: static !important;
      white-space: normal !important;
      overflow-wrap: anywhere !important;
      padding: 0.8mm 0.6mm !important;
      line-height: 1.1 !important;
      color: #000 !important;
      background: #fff !important;
      box-shadow: none !important;
      border: 0.2mm solid #aaa !important;
    }

    .results-print-table th {
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: clip !important;
    }

    .results-print-table thead { display: table-header-group; }
    .results-print-table tr { height: auto !important; break-inside: avoid; page-break-inside: avoid; }
    .results-print-table th:nth-child(1), .results-print-table td:nth-child(1) {
      width: 18mm !important;
      min-width: 18mm !important;
    }
    .results-print-table th:nth-child(2), .results-print-table td:nth-child(2) { width: 16mm; }
    .results-print-table th:nth-child(3), .results-print-table td:nth-child(3) { width: 20mm; }
    .results-print-table th:nth-child(4), .results-print-table td:nth-child(4) { width: 25mm; }
    .results-print-table th:nth-child(5), .results-print-table td:nth-child(5),
    .results-print-table th:nth-child(6), .results-print-table td:nth-child(6),
    .results-print-table th:nth-child(9), .results-print-table td:nth-child(9) { width: 18mm; }
    .results-print-table th:nth-child(7), .results-print-table td:nth-child(7),
    .results-print-table th:nth-child(8), .results-print-table td:nth-child(8) { width: 14mm; }
    .results-print-table th:nth-child(10), .results-print-table td:nth-child(10) { width: 16mm; }
    .results-print-table th:nth-child(11), .results-print-table td:nth-child(11) { width: 21mm; }

    .results-print-image { width: 12mm !important; height: 12mm !important; }
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  align-items: end;
  padding: 20px 0;

  ${media.tablet} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  ${media.mobile} { grid-template-columns: 1fr; }
`;

export const SubmitButton = styled.button`
  min-height: 42px;
  padding: 8px 18px;
  border: 1px solid #777;
  border-radius: 12px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export const PrintButton = styled.button`
  min-height: 40px;
  padding: 8px 16px;
  border: 1px solid #777;
  border-radius: 12px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const ResultsScroll = styled.div`
  position: relative;
  max-height: calc(100vh - 120px);
  min-height: 180px;
  width: 100%;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const PrintFilters = styled.div`
  display: none;

  @media print {
    display: flex !important;
    flex-wrap: wrap;
    gap: 2mm 5mm;
    margin-bottom: 3mm;
    font-size: 8pt;
  }
`;

export const ResultsTable = styled.table`
  width: 100%;
  min-width: 1100px;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  font-size: 13px;

  tr { height: 100px; }

  th, td {
    padding: 6px 8px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #f4f4f4;
    box-shadow: 0 1px 0 #bbb;
  }

  tfoot tr {
    height: 48px;
    font-weight: 700;
    background: #f4f4f4;
  }

  tfoot td { background: #f4f4f4; }

  th:first-of-type, td:first-of-type { position: sticky; left: 0; }
  th:first-of-type { z-index: 2; background: #f4f4f4; }
  td:first-of-type { z-index: 1; background: #fff; }
  thead {
    tr {
     height: 50px;
    }
  }
`;

export const ResultImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;

  img { object-fit: contain; }
`;

export const Status = styled.div`
  padding: 12px 0;
  text-align: center;
`;
