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
  align-content: space-between;
  padding: 6mm 0;
  break-inside: avoid;
  page-break-inside: avoid;

  @media print {
    height: 297mm !important;
  }

  @media screen {
    outline: 1px solid #bbb;
    margin-bottom: 12px;
  }
`;

export const Container = styled.div`
  box-sizing: border-box;
  width: 30mm;
  height: 21.8mm;
  padding: 1.5mm 2.6mm 0.5mm;
  border: 0.1mm solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #111;
  font-family: Arial, sans-serif;

  @media print {
    height: 21.8mm !important;
    overflow: hidden !important;
    border-color: transparent;
    padding: 2mm 3mm 1.5mm;
  }
`;

export const InfoRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr) minmax(0, 0.9fr);
  align-items: center;
  gap: 0;
  margin-bottom: 0.6mm;
  line-height: 1;
`;

export const InfoCell = styled.div`
  box-sizing: border-box;
  min-width: 0;
  height: 3.5mm;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.5mm;
  border: 0.2mm solid #555;
  font-size: 4.5pt;
  text-align: left;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;

  @media print {
    height: 3.5mm !important;
    overflow: hidden !important;
  }

  span {
    display: block;
    min-width: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
  }
`;

export const Text = styled.div`
  margin-top: 0.2mm;
  font-size: 9pt;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
`;

export const BarcodeFont = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 11.8mm;
  min-height: 11.8mm;
  flex: 0 0 11.8mm;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2mm;
  overflow: hidden;
  color: #000;
  font-family: "Code39", "Code 39", "Free 3 of 9", "3 of 9 Barcode", "IDAutomationHC39M", monospace;
  font-weight: normal;
  line-height: 1;
  letter-spacing: 0;
  text-align: center;
  white-space: nowrap;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;

  span {
    display: block;
    flex: 0 0 auto;
    width: max-content;
    transform-origin: center;
  }

  @media print {
    height: 10mm !important;
    min-height: 10mm;
    flex-basis: 10mm;
    overflow: hidden !important;

  }
`;
