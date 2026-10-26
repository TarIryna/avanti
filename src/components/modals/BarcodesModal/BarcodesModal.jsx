import { create, useModal } from "@ebay/nice-modal-react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper } from "../styles";
import * as S from "./styles";
import { useEffect, useState } from "react";
import BarcodesItem from "./BarcodesItem";
import Head from "../components/Head/Head";

const BarcodesModal = create(({ id, shop }) => {
  const { remove, visible } = useModal(id);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getBarcodes = async () => {
      try {
        const query = shop == null ? "" : `?shop=${encodeURIComponent(shop)}`;
        const response = await fetch(`/api/shop/barcodes${query}`);
        const result = await response.json();
        setItems(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Failed to load barcodes", error);
      }
    };
    getBarcodes();
  }, [shop]);

  const pages = Array.from({ length: Math.ceil(items.length / 91) }, (_, pageIndex) =>
    items.slice(pageIndex * 91, (pageIndex + 1) * 91)
  );

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        {visible && <S.PrintGlobalStyles containerClass="barcodes-print-root" toolbarClass="barcodes-print-toolbar" />}
        <S.ModalContainer className="barcodes-modal-container">
          <div className="barcodes-print-toolbar print-toolbar">
            <Head close={remove} title="Друк штрихкодів" />
            <S.PrintButton type="button" disabled={!items.length} onClick={() => window.print()}>Друк</S.PrintButton>
          </div>
          <div className="barcodes-print-root print-root">
            {pages.map((page, pageIndex) => (
              <S.Page key={pageIndex}>
                {page.map((item, itemIndex) => (
                  <BarcodesItem item={item} key={`${item.code}-${pageIndex}-${itemIndex}`} />
                ))}
              </S.Page>
            ))}
          </div>
          {!items.length && <p style={{ padding: 16 }}>Немає штрихкодів для друку.</p>}
        </S.ModalContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default BarcodesModal;
