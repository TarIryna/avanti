import { create, useModal } from "@ebay/nice-modal-react";

import React, { useEffect } from "react";
import ReactModal from "@/components/modals/ReactModal";
import CheckProductInfo from "@/components/Shop/CheckProductInfo";
import * as S from "./styles";
import { OPERATION_TYPE } from "@/constants/constants";

// const CheckPrint = create(({ id, data, type }) => {
//   const { visible, hide } = useModal(id);

// // useEffect(() => {
// //   if (visible) {
// //     setTimeout(() => {
// //       window.print();
// //     }, 100); // даём время на рендер
// //   }
// //   setTimeout(() => {
// //      hide();
// //     }, 100); 
// // }, [visible]);
// const title = type = "return" ? "Чек повернення" : "Чек продажу" 

//   return (
//     <ReactModal id={id} closeOnClickOutside={false}>
//         <S.PrintContainer>
//           <S.CheckTitle>{title}</S.CheckTitle>
//                 {data.client && <S.TextCheck>{`КЛІЄНТ: ${data.client.phone} ${data.client.discount}%`}</S.TextCheck>}
//                 {!!data.items?.length && data.items.map(item => <CheckProductInfo isSmall data={item}/>)}
//                 <S.Devider/>
//                 {!!data.items?.length && <S.TextCheck>Всього: {data.total} грн</S.TextCheck>}
//                 <S.TextCheck>Термінал: {data.terminal} грн</S.TextCheck>
//                 <S.TextCheck>Готівка: {data.cash} грн</S.TextCheck>
//                 <S.Devider/>
//                 <S.Links>Нефіскальний чек</S.Links>
//                 <S.Links>https://avanti-shoes.com.ua/</S.Links>
//         </S.PrintContainer>
//     </ReactModal>
//   );
// });

// export default CheckPrint;
const CheckPrint = create(({ id, data, type }) => {
  const { visible, hide } = useModal(id);

  useEffect(() => {
    if (visible) {
      const printTimeout = setTimeout(() => {
        window.print();
        hide();
      }, 400); // Даем чуть больше времени на применение стилей перед печатью
      
      return () => clearTimeout(printTimeout);
    }
  }, [visible, hide]);

  const title = type === OPERATION_TYPE.RETURN ? "Чек повернення" : "Чек продажу"; 

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      {/* Передаем имя класса в стили, чтобы изолировать чек от скрытия */}
      <S.PrintGlobalStyles/>
      
      {/* Добавляем класс pos-receipt-print */}
      <S.PrintContainer className="pos-receipt-print">
        <S.CheckTitle>{title}</S.CheckTitle>
        {data.client && <S.TextCheck>{`КЛІЄНТ: ${data.client.phone} ${data.client.discount}%`}</S.TextCheck>}
        {!!data.items?.length && data.items.map(item => (
          <CheckProductInfo key={item.code} isSmall data={item}/>
        ))}
        <S.Devider/>
        {!!data.items?.length && <S.TextCheck>Всього: {data.total} грн</S.TextCheck>}
        <S.TextCheck>Terminal: {data.terminal} грн</S.TextCheck>
        <S.TextCheck>Готівка: {data.cash} грн</S.TextCheck>
        <S.Devider/>
        <S.Links>Нефіскальний чек</S.Links>
        <S.Links>avanti-shoes.com.ua</S.Links>
      </S.PrintContainer>
    </ReactModal>
  );
});

export default CheckPrint;
