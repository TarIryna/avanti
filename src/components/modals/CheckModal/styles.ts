import styled, { createGlobalStyle } from "styled-components";
import { media } from "@/styles/mediaBrakepoints";

export const CheckContainer = styled.div`
  width: min(900px, calc(100vw - 32px));
  height: calc(100vh - 32px);
  height: calc(100dvh - 32px);
  display: flex;
  flex-direction: column;
  background: rgb(229, 229, 229);
  border-radius: 16px;
  overflow: hidden;
  > :first-child { flex-shrink: 0; }
  ${media.mobile} {
    width: 100vw;
    height: 100dvh;
    border-radius: 0;
  }
`;

export const CheckContent = styled.div`
  flex: 1;
  min-height: 0;
  padding: 0 20px 16px;
  overflow: hidden;
  @media (max-height: 600px), (max-width: 600px) {
    padding: 0 12px 12px;
    overflow-y: auto;
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 12px;
  input { width: 100%; background: white; }
  button { max-width: 100%; }
  @media (max-height: 600px), (max-width: 600px) {
    height: auto;
    display: flex;
    flex-direction: column;
  }
`;

export const ClientSection = styled.div`
  display: grid;
  gap: 6px;
`;

export const ClientControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  > .base_input { flex: 1; min-width: 180px; }
  > button { min-height: 40px; }
  ${media.mobile} {
    > .base_input { flex-basis: 100%; }
    > button { flex: 1; }
  }
`;

export const Items = styled.div`
  min-height: 0;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-content: start;
  overscroll-behavior: contain;
  > div { width: auto; min-width: 0; overflow-wrap: anywhere; }
  @media (max-height: 600px), (max-width: 600px) { overflow: visible; }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const PaymentSection = styled.div`
  display: grid;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
  > .base_input { max-width: 250px; }
`;

export const Totals = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px 16px;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
`

export const Total = styled.div`
  font-size: 20px;
  font-weight: 600;
`

// export const PrintContainer = styled.div`
//     width: 100%;
//     background: white;
//     min-width: 300px;
//     padding: 0 20px 20px;
//     `

// export const TextCheck = styled.div`
//   font-size: 16px;
//   font-weight: 600;
// `

// export const Links = styled.div`
//   font-size: 14px;
//   font-weight: 400;
// `

// export const Devider = styled.div`
//   margin: 5px 0;
// `

// export const CheckTitle = styled.div`
//   font-size: 20px;
//   text-align: center;
//   font-weight: 600;
//   margin-bottom: 12px;
// `




export const PrintGlobalStyles = createGlobalStyle`
  @media print {
    /* 1. Полностью скрываем корневые элементы сайта, обертку модалки и ее задний фон */
    html, body, #__next, #app, main, .ReactModal__Overlay, .ReactModal__Content {
      background: none !important;
      background-color: transparent !important;
      box-shadow: none !important;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
    }

    /* Скрываем всё подряд внутри body */
    body * {
      visibility: hidden !important;
    }

    /* 2. Делаем видимым ТОЛЬКО контейнер чека и всё, что находится внутри него */
    .${props => props.containerClass}, 
    .${props => props.containerClass} * {
      visibility: visible !important;
    }

    /* 3. Жестко прижимаем чек в верхний левый угол и убираем любые ограничения ширины */
    .${props => props.containerClass} {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important; /* Растягиваем на всю ширину, которую дает принтер POS-58 */
      max-width: 100% !important;
      min-width: 0 !important;
      margin: 0 !important;
      padding: 0 5px !important;
      box-shadow: none !important;
      background: white !important;
    }

    /* 4. Отключаем поля и отступы самого принтера, чтобы лента не пустовала */
    @page {
      size: auto;
      margin: 0 !important;
    }
  }
`;

export const PrintContainer = styled.div`
  width: 100%;
  background: white;
  padding: 10px;
  box-sizing: border-box;
  font-family: 'Courier New', Courier, monospace; /* Кассовый шрифт */
  color: #000;
`;

export const TextCheck = styled.div`
  font-size: 16px; /* Теперь этот размер будет крупным и читаемым на ленте */
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 4px;
`;

export const CheckTitle = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: 800;
  margin-bottom: 14px;
  text-transform: uppercase;
`;

export const Devider = styled.div`
  margin: 8px 0;
  border-top: 2px dashed #000; /* Четкая линия отрыва чека */
`;

export const Links = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  margin-top: 4px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  > button { width: 100%; min-height: 40px; }
  ${media.mobileSm} { grid-template-columns: 1fr; }
`
