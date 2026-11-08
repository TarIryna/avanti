import { create, useModal } from "@ebay/nice-modal-react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper } from "../styles";
import * as S from "./styles";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LabelItem from "./LabelItem";
import Head from "../components/Head/Head";

const LabelsModal = create(({ id, shop, queueShop }) => {
  const { remove, visible } = useModal(id);
  const [labels, setLabels] = useState([]);
  const [isClearing, setIsClearing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [printShop, setPrintShop] = useState(null);
  const [pendingPrint, setPendingPrint] = useState(null);
  const currentShop = shop == null ? 0 : Number(shop);
  const selectedShop = queueShop == null ? null : Number(queueShop);

  useEffect(() => {
    const getLabels = async () => {
      try {
        const requestedShop = selectedShop ?? currentShop;
        const exactQuery = selectedShop === null ? "" : "&exact=1";
        const response = await fetch(`/api/shop/labels?shop=${encodeURIComponent(requestedShop)}${exactQuery}`);
        const result = await response.json();
        setLabels(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Failed to load labels", error);
      }
    };
    getLabels();
  }, [currentShop, selectedShop, visible, refreshKey]);

  useEffect(() => {
    if (pendingPrint === null) return undefined;
    const timer = window.setTimeout(() => {
      window.print();
      setPendingPrint(null);
    }, 50);
    return () => window.clearTimeout(timer);
  }, [pendingPrint]);

  const deleteLabels = async (targetShop = selectedShop ?? currentShop, includeGlobal = false) => {
    const scope = includeGlobal && targetShop !== 0 ? [0, targetShop].join(" + ") : String(targetShop);
    if (!window.confirm(`Удалить все ценники для shop: ${scope}?`)) return;

    setIsClearing(true);
    try {
      const includeGlobalQuery = includeGlobal && targetShop !== 0 ? "&includeGlobal=1" : "";
      const response = await fetch(`/api/shop/labels?shop=${targetShop}${includeGlobalQuery}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Не удалось очистить очередь ценников");
      toast.success(`Удалено ценников: ${result.deletedCount ?? 0}`);
      setRefreshKey((current) => current + 1);
    } catch (error) {
      toast.error(error.message || "Ошибка очистки очереди ценников");
    } finally {
      setIsClearing(false);
    }
  };

  const allGroups = [
    {
      shopId: 0,
      title: "Общие ценники (shop: 0)",
      items: labels.filter((item) => Number(item.labelShop ?? 0) === 0),
    },
    ...(currentShop === 0 ? [] : [{
      shopId: currentShop,
      title: `Ценники магазина ${currentShop} (shop: ${currentShop})`,
      items: labels.filter((item) => Number(item.labelShop) === currentShop),
    }]),
  ];
  const groups = selectedShop === null
    ? allGroups
    : allGroups.filter((group) => group.shopId === selectedShop);

  const printGroup = (shopId) => {
    setPrintShop(shopId);
    setPendingPrint((current) => (current ?? 0) + 1);
  };

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        {visible && <S.PrintGlobalStyles containerClass="labels-print-root" toolbarClass="labels-print-toolbar" />}
        <S.ModalContainer className="labels-modal-container">
          <div className="labels-print-toolbar print-toolbar">
            <Head close={remove} title="Друк цінників" />
            <S.ClearButton type="button" disabled={isClearing} onClick={() => deleteLabels()}>
              {isClearing ? "Очищаем…" : `Очистить shop: ${selectedShop ?? currentShop}`}
            </S.ClearButton>
            {currentShop !== 0 && (
              <S.ClearButton type="button" disabled={isClearing} onClick={() => deleteLabels(currentShop, true)}>
                Очистить shop: 0 + {currentShop}
              </S.ClearButton>
            )}
          </div>

          <S.PrintGroups>
            {groups.map((group) => {
              const pages = Array.from({ length: Math.ceil(group.items.length / 40) }, (_, pageIndex) =>
                group.items.slice(pageIndex * 40, (pageIndex + 1) * 40)
              );
              return (
                <S.PrintGroup key={group.shopId}>
                  <S.PrintGroupHeader>
                    <S.PrintGroupTitle>{group.title} · {group.items.length}</S.PrintGroupTitle>
                    <S.PrintButton type="button" disabled={!group.items.length} onClick={() => printGroup(group.shopId)}>
                      Печать shop: {group.shopId}
                    </S.PrintButton>
                  </S.PrintGroupHeader>
                  <div className={`labels-print-root print-root${printShop === group.shopId ? " print-selected" : ""}`}>
                    {pages.map((page, pageIndex) => (
                      <S.Page key={pageIndex}>
                        {page.map((item, itemIndex) => (
                          <LabelItem
                            item={item}
                            shop={Number(item.labelShop ?? 0) === 0 ? undefined : item.labelShop}
                            key={`${item.code}-${group.shopId}-${pageIndex}-${itemIndex}`}
                          />
                        ))}
                      </S.Page>
                    ))}
                  </div>
                </S.PrintGroup>
              );
            })}
          </S.PrintGroups>
          {!labels.length && <p style={{ padding: 16 }}>Немає цінників для друку.</p>}
        </S.ModalContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default LabelsModal;
