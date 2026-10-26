import { create, useModal } from "@ebay/nice-modal-react";
import React, { useCallback, useEffect, useState } from "react";
import ReactModal from "../ReactModal";
import Head from "../components/Head/Head";
import { Button } from "@mui/material";
import { Wrapper, Content } from "../styles";
import * as S from "./styles";
import { OPERATION_TYPE } from "@/constants/constants";
import toast from "react-hot-toast";

const ArrivalAutoModal = create(({ id, shop }) => {
  const { remove } = useModal(id);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [sourceShop, setSourceShop] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/shop/arrival-auto?shop=${encodeURIComponent(shop)}`);
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Не вдалося завантажити списання");
      setItems(result.items || []);
      setSelected(new Set((result.items || []).filter((item) => !item.missingProduct).map((item) => item.id)));
      setSourceShop(result.sourceShop);
      setDate(result.date);
    } catch (loadError) {
      setError(loadError.message || "Не вдалося завантажити списання");
    } finally {
      setLoading(false);
    }
  }, [shop]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const toggleItem = (itemId) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const addToArrival = async () => {
    const chosenItems = items.filter((item) => selected.has(item.id) && !item.missingProduct);
    if (!chosenItems.length) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/shop/operation/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shop: Number(shop),
          type: OPERATION_TYPE.ARRIVAL,
          items: chosenItems.map((item) => ({
            code: item.code,
            name: item.name,
            images: item.image ? [item.image] : [],
            size: item.size,
            quantity: item.size.reduce((sum, size) => sum + (Number(size.q) || 0), 0),
            comment: `Автоматичний прихід зі списань магазину ${sourceShop} за ${date}`,
            sourceOperationId: item.id,
          })),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.error || "Не вдалося оформити прихід");
      toast.success(`Додано в прихід позицій: ${chosenItems.length}`);
      await loadItems();
    } catch (submitError) {
      toast.error(submitError.message || "Помилка під час оформлення приходу");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCount = items.filter((item) => selected.has(item.id) && !item.missingProduct).length;

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.Container>
          <Head close={remove} title="Автоматичний прихід" />
          <Content>
            <S.Summary>
              {sourceShop && `Списання магазину ${sourceShop} за ${date} для приходу в магазин ${shop}`}
            </S.Summary>
            {loading && <S.Message>Завантаження списань…</S.Message>}
            {!loading && error && <S.Error>{error}</S.Error>}
            {!loading && !error && items.length === 0 && (
              <S.Message>За вчора списань з магазину {sourceShop} не знайдено або всі вони вже додані в прихід.</S.Message>
            )}
            {!loading && !error && items.length > 0 && (
              <>
                <S.List>
                  {items.map((item) => (
                    <S.Item key={item.id}>
                      <input
                        type="checkbox"
                        checked={selected.has(item.id)}
                        disabled={item.missingProduct}
                        onChange={() => toggleItem(item.id)}
                        aria-label={`Додати товар ${item.code}`}
                      />
                      {item.image && <S.Image src={item.image} alt="" />}
                      <S.Details>
                        <strong>{item.name} · {item.code}</strong>
                        <span>{item.size.map(({ size, q }) => `${size}: ${q}`).join("; ")}</span>
                        {item.missingProduct && <S.Error>Товар не знайдено в каталозі — не можна додати автоматично.</S.Error>}
                      </S.Details>
                    </S.Item>
                  ))}
                </S.List>
                <S.Actions>
                  <Button variant="outlined" onClick={loadItems} disabled={loading || submitting}>Оновити список</Button>
                  <Button variant="contained" onClick={addToArrival} disabled={!selectedCount || submitting}>
                    {submitting ? "Додаємо…" : `Додати в прихід (${selectedCount})`}
                  </Button>
                </S.Actions>
              </>
            )}
          </Content>
        </S.Container>
      </Wrapper>
    </ReactModal>
  );
});

export default ArrivalAutoModal;
