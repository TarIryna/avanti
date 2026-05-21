import { create, useModal } from "@ebay/nice-modal-react";

import React, { useEffect } from "react";
import ReactModal from "@/components/modals/ReactModal";
import Head from "../components/Head/Head";
import CheckProductInfo from "@/components/Shop/CheckProductInfo";
import * as S from "./styles";

const CheckPrint = create(({ id, data }) => {
  const { visible, hide } = useModal(id);

useEffect(() => {
  if (visible) {
    setTimeout(() => {
      window.print();
    }, 100); // даём время на рендер
  }
  setTimeout(() => {
     hide();
    }, 100); 
}, [visible]);

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
        <S.PrintContainer>
          <S.CheckTitle>Чек продажу</S.CheckTitle>
                {data.client && <S.TextCheck>{`КЛІЄНТ: ${data.client.phone} ${data.client.discount}%`}</S.TextCheck>}
                {!!data.items?.length && data.items.map(item => <CheckProductInfo isSmall data={item}/>)}
                <S.Devider/>
                {!!data.items?.length && <S.TextCheck>Всього: {data.total} грн</S.TextCheck>}
                <S.TextCheck>Термінал: {data.terminal} грн</S.TextCheck>
                <S.TextCheck>Готівка: {data.cash} грн</S.TextCheck>
                <S.Devider/>
                <S.Links>Нефіскальний чек</S.Links>
                <S.Links>https://avanti-shoes.com.ua/</S.Links>
        </S.PrintContainer>
    </ReactModal>
  );
});

export default CheckPrint;
