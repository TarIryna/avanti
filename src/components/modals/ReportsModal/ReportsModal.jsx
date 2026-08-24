import { create, useModal } from "@ebay/nice-modal-react";
import ReactModal from "react-modal";
import { Wrapper } from "../styles";
import * as S from "./styles";
import { useEffect } from "react";

const ReportsModal = create(({ id, report, shop }) => {
 const modal = useModal(id);

 const today = new Date();
 const formattedDate = today.toLocaleDateString('ru-RU');
 const totalOperations = report.operations.reduce((sum, op) => sum + Number(op.quantity || 0), 0);
  const totalSum = report.operations.reduce((sum, op) => {
    // Умножаем на -quantity, так как при продаже (quantity < 0) деньги в кассу ПРИХОДЯТ (+), 
    // а при возврате (quantity > 0) деньги из кассы УХОДЯТ (-)
    const qty = Number(op.quantity || 0);
    const price = Number(op.salePrice || 0);
    
    return sum + (-qty * price);
  }, 0);
    // 2. Общая сумма по терминалу
  const totalTerminal = report.operations.reduce((sum, op) => {
    const qty = Number(op.quantity || 0);
    const terminal = Number(op.terminal || 0);
    
    return sum + (-qty * terminal);
  }, 0);

 const totalBefore = report.total + totalOperations


  //  useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     // Проверяем, что нажата именно клавиша Escape
  //     if (e.key === "Escape") {
  //       modal.remove();
  //     }
  //   };

  //   // Слушаем нажатия на уровне всего документа, пока модалка открыта
  //   if (modal.visible) {
  //     document.addEventListener("keydown", handleKeyDown);
  //     // Небольшая задержка, чтобы браузер успел отрендерить контент модалки перед печатью
  //     const timer = setTimeout(() => {
  //       window.print();
  //     }, 100);

  //     return () => clearTimeout(timer);
  //   }

  //   // Чистим за собой событие, когда модалка закрывается
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [modal.visible]);

//   const customModalStyles = {
//   overlay: {
//     overflowY: 'auto', // Включаем скролл на самом заднем фоне (overlay)
//      zIndex: 200,
//   },
//   content: {
//     position: 'relative', // Отменяем абсолютное позиционирование react-modal
//     top: 'auto',
//     left: 'auto',
//     right: 'auto',
//     bottom: 'auto',
//     width: '100vw',
//     maxWidth: '100vw', // Ширина под ваш формат А4 с отступами
//     minHeight: 'auto', // Высота прыгает в зависимости от контента
//     padding: '20px',
//     borderRadius: '8px',
//     background: '#fff',
//     border: 'none',
//   },
// };

  return (
    <ReactModal
      isOpen={modal.visible}
      // Встроенный метод библиотеки: закрывает по Esc и клику на темный фон
      onRequestClose={() => modal.remove()} 
      // style={customModalStyles}
      ariaHideApp={false}
    >
      <Wrapper>
        <S.ModalContainer>
          <S.TitleBlock>
            <S.Date>{formattedDate}</S.Date>
            <S.RightBlock>
              <S.TitleText>{totalSum}</S.TitleText>
              <S.TitleText>{totalTerminal}</S.TitleText>
              <S.TitleText></S.TitleText>
            </S.RightBlock>
            <S.RightBlock>
              <S.TitleText>{totalBefore}</S.TitleText>
              <S.TitleText>A{shop}</S.TitleText>
              <S.TitleText>{report.total}</S.TitleText>
            </S.RightBlock>
          </S.TitleBlock>
        </S.ModalContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default ReportsModal;
