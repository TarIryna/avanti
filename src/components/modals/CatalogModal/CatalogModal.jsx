import { create, useModal } from "@ebay/nice-modal-react";
import ReactModal from "react-modal";
import { Wrapper } from "../styles";
import * as S from "./styles";
import { useEffect } from "react";
import LabelItem from "./CatalogItem";

const LabelsModal = create(({ id, items }) => {
 const modal = useModal(id);

   useEffect(() => {
    const handleKeyDown = (e) => {
      // Проверяем, что нажата именно клавиша Escape
      if (e.key === "Escape") {
        modal.remove();
      }
    };

    // Слушаем нажатия на уровне всего документа, пока модалка открыта
    if (modal.visible) {
      document.addEventListener("keydown", handleKeyDown);
      // Небольшая задержка, чтобы браузер успел отрендерить контент модалки перед печатью
      const timer = setTimeout(() => {
        window.print();
      }, 100);

      return () => clearTimeout(timer);
    }

    // Чистим за собой событие, когда модалка закрывается
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal.visible]);

  const customModalStyles = {
  overlay: {
    overflowY: 'auto', // Включаем скролл на самом заднем фоне (overlay)
     zIndex: 200,
  },
  content: {
    position: 'relative', // Отменяем абсолютное позиционирование react-modal
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    width: '100vw',
    maxWidth: '100vw', // Ширина под ваш формат А4 с отступами
    minHeight: 'auto', // Высота прыгает в зависимости от контента
    padding: '20px',
    borderRadius: '8px',
    background: '#fff',
    border: 'none',
  },
};

  return (
    <ReactModal
      isOpen={modal.visible}
      // Встроенный метод библиотеки: закрывает по Esc и клику на темный фон
      onRequestClose={() => modal.remove()} 
      style={customModalStyles}
      ariaHideApp={false}
    >
      <Wrapper>
        <S.ModalContainer>
          <S.List>
          {items && items.map(item => <LabelItem item={item} key={item.id}/>)}
          </S.List>
        </S.ModalContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default LabelsModal;
