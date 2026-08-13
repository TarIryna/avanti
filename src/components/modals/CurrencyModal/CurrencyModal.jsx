import { create, useModal } from "@ebay/nice-modal-react";
import RateForm from "@/components/Base/Rate/RateForm";
import ReactModal from "../ReactModal";
import { Wrapper, Container, Content } from "../styles";
import Head from "../components/Head/Head";

const CurrencyModal = create(({ id }) => {
  const { remove } = useModal(id);
  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <Container>
          <Head close={remove} title="Курс валюти" />
          <Content>
            <RateForm/>
          </Content>
        </Container>
      </Wrapper>
    </ReactModal>
  );
});

export default CurrencyModal;
