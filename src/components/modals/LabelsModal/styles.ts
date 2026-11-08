import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";

export const PrintGlobalStyles = createGlobalStyle`
  @page { size: A4 portrait; margin: 0; }

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

    .${({ containerClass }) => containerClass}.print-selected,
    .${({ containerClass }) => containerClass}.print-selected * {
      visibility: visible !important;
    }

    .${({ containerClass }) => containerClass}:not(.print-selected) {
      display: none !important;
    }

    .${({ containerClass }) => containerClass}.print-selected {
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

    .labels-modal-container {
      width: 210mm !important;
      height: auto !important;
      overflow: visible !important;
    }

    .${({ toolbarClass }) => toolbarClass} { display: none !important; }

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

  .print-root {
    width: 210mm;
  }

`;

export const PrintGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const PrintGroup = styled.section`
  min-width: 0;
`;

export const PrintGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
`;

export const PrintGroupTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

export const PrintButton = styled.button`
  border: 1px solid #333;
  border-radius: 8px;
  background: #fff;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const ClearButton = styled.button`
  border: 1px solid #a33;
  border-radius: 8px;
  background: #fff;
  color: #a22;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: default; }
`;

export const Page = styled.div`
  box-sizing: border-box;
  width: 210mm;
  height: 297mm;
  display: grid;
  grid-template-columns: repeat(4, 52.5mm);
  grid-template-rows: repeat(10, 29.7mm);
  break-inside: avoid;
  page-break-inside: avoid;

  @media screen {
    outline: 1px solid #bbb;
    margin-bottom: 12px;
  }
`;

export const Container = styled.div`
  box-sizing: border-box;
  width: 52.5mm;
  height: 29.7mm;
  padding: 3mm 3.5mm 1mm;
  border: 0.15mm solid #555;
  display: grid;
  grid-template-rows: 4mm 4mm 5mm minmax(0, 1fr) 2.5mm;
  overflow: hidden;
  font-family: Arial, sans-serif;
  color: #111;

  @media print { border-color: #ddd; }
`;

export const Text = styled.div`
  font-size: ${({ bold }) => (bold ? "16pt" : "7pt")};
  line-height: 1.15;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LabelHeader = styled.div`
  min-width: 0;
  height: 4mm;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.7mm;
  border-bottom: 0.2mm solid #111;
`;

export const LabelCode = styled.div`
  min-width: 0;
  overflow: hidden;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
`;

export const LabelAvanti = styled.div`
  max-width: 15mm;
  overflow: hidden;
  border: 0.25mm solid #111;
  padding: 0 0.5mm;
  font-size: 6pt;
  font-weight: 700;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LabelModel = styled.div`
  min-width: 0;
  height: 2mm;
  overflow: hidden;
  font-size: 5.5pt;
  line-height: 2mm;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LabelSizes = styled.div`
  min-width: 0;
  height: 5mm;
  display: flex;
  align-items: center;
  gap: 0.5mm;
  overflow: hidden;
  white-space: nowrap;
`;

export const SizeLabel = styled.span`
  flex: 0 0 auto;
  margin-right: 0.5mm;
  font-size: 5.5pt;
  font-weight: 700;
`;

export const SizeCell = styled.span`
  flex: 1 1 0;
  min-width: 0;
  max-width: 10mm;
  height: 4.2mm;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4mm;
  padding: 0 0.5mm;
  border: 0.25mm solid #111;
  line-height: 1;
`;

export const SizeValue = styled.span`
  font-size: 8.5pt;
  font-weight: 700;
  position: relative;
`;

export const SizeQuantity = styled.span`
  flex: 0 0 auto;
  font-size: 5pt;
  font-weight: 700;
  position: absolute;
  bottom: -2px;
  right: -5px;
`;


export const StockCounts = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 4pt;
  line-height: 2.5mm;
  white-space: nowrap;
`;

export const PriceBlock = styled.div`
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3mm;
  overflow: hidden;
`;

export const LabelPrice = styled.div`
  font-size: ${({ isDiscounted }) => (isDiscounted ? "15pt" : "27pt")};
  line-height: 1;
  font-weight: 700;
  color: ${({ isDiscounted }) => (isDiscounted ? "#d00000" : "#111")};
  white-space: nowrap;
`;

export const OriginalPrice = styled.div`
  font-size: 16pt;
  line-height: 1;
  font-weight: 400;
  text-decoration: line-through;
  white-space: nowrap;
`;

export const LabelCurrency = styled.span`
  align-self: flex-end;
  margin-bottom: 2mm;
  font-size: 7pt;
  font-weight: 700;
  white-space: nowrap;
`;

export const PrintDate = styled.div`
  flex: 0 0 auto;
  height: 2.5mm;
  font-size: 5.5pt;
  line-height: 2.5mm;
  white-space: nowrap;
`;

export const PrintFooter = styled.div`
  grid-column: 1;
  grid-row: 5;
  min-width: 0;
  display: flex;
  align-items: end;
  gap: 2mm;
`;

export const Flex = styled.div`
  min-width: 0;
  display: flex;
  gap: 1mm;
  box-sizing: border-box;
  padding-top: 0.5mm;
`
