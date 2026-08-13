import styled from "@emotion/styled";


export const Container = styled.div``

export const Text = styled.div``

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: white;
`;

export const LabelWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  p {
  font-size: 10px;
  }

  div {
      width: 50px;
     height: 50px;

    img {

      object-position: center;
      object-fit: contain;
      }
  }

  
`

export const Title = styled.h3`
  font-weight: 600;
  font-size: 14px;
  padding: 0 4px;
`;

export const Flex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 10px;
`


export const PriceWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 10px;
  position: relative;
`;

export const PriceContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 position: relative;
`

export const List = styled.div`
  padding: 0 6px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media print {
    display: block; /* Отключаем флексы у родителя, чтобы корректно работали разрывы страниц */
    padding: 0;
    margin: 0;
  }
`;

export const CardWrapper = styled.div`
  width: calc(100vw - 50px);
  border: 1px solid grey;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px 0;
  cursor: pointer;

  @media print {
    /* Каждая карточка занимает ровно печатную область одного листа A4 */
    width: 100vw;
    height: 100vh; 
    
    /* Убираем скругления и лишние отступы для чистоты печати */
    border: none;
    border-radius: 0;
    padding: 20mm; /* Внутренние поля, чтобы контент не прижимался к краям листа */
    box-sizing: border-box;
    
    /* Главное правило: принудительный разрыв страницы ПОСЛЕ каждой карточки */
    page-break-after: always; 
    break-after: page;
  }
`;

export const ImageWrapper = styled.div`
  width: 900px;
  height: 1000px;
  position: relative;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: contain;
  }

  @media print {
    /* 1. Жестко фиксируем внешние размеры контейнера для принтера */
    width: 100% !important;
    height: 130mm !important; /* Уменьшили до 130мм, чтобы точно гарантировать запас на листе */
    max-height: 130mm !important;
    margin: 0 auto 10mm auto !important;
    
    /* 2. Включаем Flexbox, чтобы центрировать изображение, если оно меньше контейнера */
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    overflow: hidden !important; /* На всякий случай гасим любой выход за рамки */

    /* 3. Жесткое подавление инлайн-стилей Next.js для картинки */
    img {
      position: relative !important; /* Сбрасываем absolute, который ломал логику */
      top: auto !important;
      left: auto !important;
      right: auto !important;
      bottom: auto !important;
      
      /* Заставляем картинку сжиматься, если она больше, но не растягивать блок */
      width: auto !important; 
      height: auto !important;
      max-width: 100% !important;
      max-height: 100% !important;
      
      /* Сохраняем пропорции без деформации */
      object-fit: contain !important; 
    }
  }
`;



export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center; /* Исправлена опечатка в вашем центе */

  @media print {
    width: 100%;
    height: 28vh; /* Оставшиеся ~35% высоты листа уходят под цены и код */
    justify-content: space-between;
  }
`;

export const Price = styled.div`
  font-size: 70px;
  font-weight: 600;
  text-align: center;
  color: black;

  @media print {
    font-size: 60pt; /* Пропорционально крупный шрифт для формата А4 */
  }
`;

export const SalePrice = styled(Price)`
  color: red;
`;

export const LastPrice = styled(Price)`
  text-decoration: line-through;
`;

export const Code = styled.p`

  @media print {
    font-size: 14pt;
  }
`;
