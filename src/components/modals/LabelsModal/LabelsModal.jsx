import { create, useModal } from "@ebay/nice-modal-react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper } from "../styles";
import * as S from "./styles";
import { useEffect, useState } from "react";
import LabelItem from "./LabelItem";
import Head from "../components/Head/Head";

const LabelsModal = create(({ id }) => {
  const { remove, visible } = useModal(id);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const getLabels = async () => {
      try {
        const response = await fetch("/api/shop/labels");
        const result = await response.json();
        setLabels(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Failed to load labels", error);
      }
    };
    getLabels();
  }, []);

  const pages = Array.from({ length: Math.ceil(labels.length / 40) }, (_, pageIndex) =>
    labels.slice(pageIndex * 40, (pageIndex + 1) * 40)
  );

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        {visible && <S.PrintGlobalStyles containerClass="labels-print-root" toolbarClass="labels-print-toolbar" />}
        <S.ModalContainer className="labels-modal-container">
          <div className="labels-print-toolbar print-toolbar">
            <Head close={remove} title="Друк цінників" />
            <S.PrintButton type="button" disabled={!labels.length} onClick={() => window.print()}>Друк</S.PrintButton>
          </div>
          <div className="labels-print-root print-root">
            {pages.map((page, pageIndex) => (
              <S.Page key={pageIndex}>
                {page.map((item, itemIndex) => (
                  <LabelItem item={item} key={`${item.code}-${pageIndex}-${itemIndex}`} />
                ))}
              </S.Page>
            ))}
          </div>
          {!labels.length && <p style={{ padding: 16 }}>Немає цінників для друку.</p>}
        </S.ModalContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default LabelsModal;
