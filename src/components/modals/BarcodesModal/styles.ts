import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";

export const PrintGlobalStyles = createGlobalStyle`
  @media print {
    html, body, #__next, #app, main, .ReactModal__Overlay, .ReactModal__Content {
      background: transparent !important;
      box-shadow: none !important;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
    }

    body * { visibility: hidden !important; }

    .${({ containerClass }) => containerClass},
    .${({ containerClass }) => containerClass} * {
      visibility: visible !important;
    }

    .${({ containerClass }) => containerClass} {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      max-width: 210mm !important;
      min-width: 0 !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: #fff !important;
    }

    .barcodes-modal-container {
      width: 210mm !important;
      height: auto !important;
      overflow: visible !important;
    }

    .${({ toolbarClass }) => toolbarClass} { display: none !important; }

    @page { size: A4 portrait; margin: 0; }
  }
`;

export const ModalContainer = styled.div`
  width: min(210mm, calc(100vw - 24px));
  height: min(297mm, calc(100vh - 24px));
  overflow: auto;
  background: #fff;

  .print-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
  }

  .print-root { width: 210mm; }

`;

export const PrintButton = styled.button`
  border: 1px solid #333;
  border-radius: 8px;
  background: #fff;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const Page = styled.div`
  box-sizing: border-box;
  width: 210mm;
  height: 297mm;
  display: grid;
  grid-template-columns: repeat(7, 30mm);
  grid-template-rows: repeat(13, 21.8mm);
  justify-content: start;
  align-content: center;
  break-inside: avoid;
  page-break-inside: avoid;

  @media screen {
    outline: 1px solid #bbb;
    margin-bottom: 12px;
  }
`;

export const Container = styled.div`
  box-sizing: border-box;
  width: 30mm;
  height: 21.8mm;
  padding: 1mm 2.6mm;
  border: 0.1mm solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #111;
  font-family: Arial, sans-serif;

  @media print { border-color: transparent; }
`;

export const Text = styled.div`
  font-size: 6pt;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
`;

export const BarcodeBars = styled.div`
  box-sizing: border-box;
  width: max-content;
  max-width: 100%;
  height: 12mm;
  min-height: 12mm;
  flex: 0 0 12mm;
  display: flex;
  align-items: stretch;
  background: #fff;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
`;

export const BarcodeModule = styled.span`
  box-sizing: border-box;
  flex: 0 0 ${({ $width, $moduleWidth }) => `${$width * $moduleWidth}mm`};
  width: ${({ $width, $moduleWidth }) => `${$width * $moduleWidth}mm`};
  height: 100%;
  background: ${({ $isBar }) => ($isBar ? "#000" : "#fff")};
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
`;
