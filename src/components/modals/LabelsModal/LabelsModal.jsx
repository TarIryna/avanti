import { create, useModal } from "@ebay/nice-modal-react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper, Container, Content } from "../styles";
import * as S from "./styles";
import { useEffect, useState } from "react";
import LabelItem from "./LabelItem";
import Head from "../components/Head/Head";

const LabelsModal = create(({ id }) => {
  const { remove } = useModal(id);
  const [labels, setLabels] = useState([])

  const getLabels = async() => {
    try {
       const res = await fetch('/api/shop/labels', { 
        method: 'GET',
      });
     const result = await res.json();
     setLabels(result)

    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getLabels()
  }, [])

  console.log(labels)

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.ModalContainer>
          <Head close={remove}/>
          <S.Grid>
          {labels && labels.map(item => <LabelItem item={item} key={item.id}/>)}
          </S.Grid>
        </S.ModalContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default LabelsModal;
