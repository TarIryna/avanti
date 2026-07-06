import { create, useModal } from "@ebay/nice-modal-react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper, Container, Content } from "../styles";
import * as S from "./styles";
import { useEffect, useState } from "react";
import LabelItem from "./CatalogItem";
import Head from "../components/Head/Head";

const LabelsModal = create(({ id, items }) => {
  const { remove } = useModal(id);

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.ModalContainer>
          <Head close={remove}/>
          <S.Grid>
          {items && items.map(item => <LabelItem item={item} key={item.id}/>)}
          </S.Grid>
        </S.ModalContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default LabelsModal;
