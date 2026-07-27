import styled, { createGlobalStyle } from "styled-components";
import { media } from "@/styles/mediaBrakepoints";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  input {
    background: white;
    max-width: 100%;
  }
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
  font-size: 22px;
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
