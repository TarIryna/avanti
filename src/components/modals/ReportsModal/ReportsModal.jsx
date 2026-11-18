import { create, useModal } from "@ebay/nice-modal-react";
import ReactModal from "react-modal";
import { Wrapper } from "../styles";
import * as S from "./styles";
import Operations from "./Operations";
import Head from "../components/Head/Head";
import { getStaffName } from '@/data/staff';
import { spendings as spendingTypes } from '@/data/spendings';
import { daySpendingSummary } from '@/helpers/daySpendingSummary';

const ReportsModal = create(({ id, report, shop }) => {
 const modal = useModal(id);

 const today = new Date();
 const formattedDate = today.toLocaleDateString('uk-UA', { timeZone: 'Europe/Kyiv' });
 const { workers, expenses, totalExpenses } = daySpendingSummary(report.spendings || []);
 const formatMoney = value => new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 2 }).format(Number(value) || 0);
 const staffName = staff => getStaffName(staff) || 'Продавця не вказано';
 const totalOperations = report?.operations?.reduce((sum, op) => sum + Number(op.quantity || 0), 0);
 const totalSum = report?.operations?.reduce((sum, op) => {
    // Умножаем на -quantity, так как при продаже (quantity < 0) деньги в кассу ПРИХОДЯТ (+), 
    // а при возврате (quantity > 0) деньги из кассы УХОДЯТ (-)
    const qty = Number(op.quantity || 0);
    const price = Number(op.salePrice || 0);
    
    return sum + (-qty * price);
  }, 0);
    // 2. Общая сумма по терминалу
  const totalTerminal = report?.operations?.reduce((sum, op) => {
    const qty = Number(op.quantity || 0);
    const terminal = Number(op.terminal || 0);
    
    return sum + (-qty * terminal);
  }, 0);

 const totalBefore = report.total - totalOperations


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

  const customModalStyles = {
  overlay: {
    overflowY: 'auto', // Включаем скролл на самом заднем фоне (overlay)
     zIndex: 200,
  },
  content: {
    position: 'relative', // Отменяем абсолютное позиционирование react-modal
    top: '100px',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    width: 'calc(100vw - 20px)',
    maxWidth: 'calc(100vw - 20px)', // Ширина под ваш формат А4 с отступами
    minHeight: 'auto', // Высота прыгает в зависимости от контента
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
          <Head close={() => modal.remove()}/>
          <S.TitleBlock>
            <S.Date>{formattedDate}</S.Date>
                     <S.SummarySection>
              <h3>Працювали</h3>
              {workers.length ? <S.SummaryList>
                {workers.map(worker => <li key={worker.staff ?? 'unknown'}>
                  <strong>{staffName(worker.staff)}</strong>
                  <span>{worker.hours == null ? 'Години не вказано' : `${worker.hours} год.`}</span>
                </li>)}
              </S.SummaryList> : <p>Робочі години не внесено.</p>}
            </S.SummarySection>
            <S.Date>A{shop}</S.Date>
                   <S.SummarySection>
              <h3>Витрати — {formatMoney(totalExpenses)} грн</h3>
              {expenses.length ? <S.SummaryList>
                {expenses.map((expense, index) => <li key={expense._id || index}>
                  <div>
                    <strong>{spendingTypes.find(item => item.id === Number(expense.type))?.ukr || 'Витрати'}</strong>
                    <S.ExpenseDetail>{staffName(expense.staff)}</S.ExpenseDetail>
                    {String(expense.comment || '').trim() && <S.ExpenseDetail>{expense.comment}</S.ExpenseDetail>}
                  </div>
                  <strong>{formatMoney(expense.amount)} грн</strong>
                </li>)}
              </S.SummaryList> : <p>Витрат немає.</p>}
            </S.SummarySection>
            <S.RightBlock>
              <S.TitleText>{totalSum}</S.TitleText>
              <S.TitleText>{totalTerminal}</S.TitleText>
              <S.TitleText>{totalSum - totalTerminal}</S.TitleText>
            </S.RightBlock>
            <S.RightBlock>
              <S.TitleText>{totalBefore}</S.TitleText>
              <S.TitleText>{totalOperations}</S.TitleText>
              <S.TitleText>{report.total}</S.TitleText>
            </S.RightBlock>
          </S.TitleBlock>

          {!!report.operations?.length && <S.Operations>
               <Operations operations={report.operations}/>
          </S.Operations>}
        </S.ModalContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default ReportsModal;
