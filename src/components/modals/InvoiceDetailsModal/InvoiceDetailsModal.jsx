import { create, useModal } from "@ebay/nice-modal-react";
import React, { useEffect, useState } from "react";
import { Wrapper } from "../styles";
import ReactModal from "../ReactModal";
import Head from "../components/Head/Head";
import { parseDate } from "@/helpers/getDate";
import { getCompanyName } from "@/data/companies";
import * as S from './styles'
import { getCurrencyName } from "@/data";
import List from "./List";

const InvoiceModal = create(({ item, id }) => {
  const { remove } = useModal(id);

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.Container>
          <Head close={remove} title="Накладна" />
          <S.Content>
            <S.Flex>
              <S.Title>Дата: </S.Title>
              <S.Text>{parseDate(item.date)} </S.Text>
            </S.Flex>
            <S.Flex>
              <S.Title>Компания: </S.Title>
              <S.Text>{getCompanyName(item.company)} </S.Text>
            </S.Flex>
          <S.Flex>
              <S.Title>Сума: </S.Title>
              <S.Text>{`${item.total} ${getCurrencyName(item.currency)}`} </S.Text>
            </S.Flex>
           {item.currency  !== 1 && <S.Flex>
              <S.Title>Сума USD: </S.Title>
              <S.Text>{item.totalUSD} </S.Text>
            </S.Flex>}

            {!!item.items?.length && <List items={item.items} rate={item.rate}/>}
          </S.Content>
        </S.Container>
      </Wrapper>
    </ReactModal>
  );
});

export default InvoiceModal;
