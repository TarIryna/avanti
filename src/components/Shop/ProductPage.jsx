"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@ebay/nice-modal-react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getVendor } from "@/data/getData";
import { MODALS } from "@/constants/constants";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import ImageWrapper from "@/components/Product/ImageWrapper";
import Sizes from "@/components/Product/Sizes";
import { shopsData } from "./data";
import * as S from "./ProductInspector/styles";

registerDynamicModal(MODALS.LABELS_MODAL, import("@/components/modals/LabelsModal/LabelsModal"));
registerDynamicModal(MODALS.BARCODES_MODAL, import("@/components/modals/BarcodesModal/BarcodesModal"));

const shops = shopsData.filter(({ isShop }) => isShop);

const ProductPage = () => {
  const { shop } = useParams();
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState(null);
  const [results, setResults] = useState([]);
  const [barcodeAmount, setBarcodeAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState("");
  const { show: showLabels } = useModal(MODALS.LABELS_MODAL);
  const { show: showBarcodes } = useModal(MODALS.BARCODES_MODAL);

  const searchController = useRef(null);
  useEffect(() => () => searchController.current?.abort(), []);

  const search = async (event) => {
    event?.preventDefault();
    searchController.current?.abort();
    const controller = new AbortController();
    searchController.current = controller;
    const value = query.trim();
    setProduct(null);
    setResults([]);
    setBarcodeAmount(1);
    if (!value) { setLoading(false); return; }
    setLoading(true);
    try {
      const response = await fetch(`/api/shop/products/search?${new URLSearchParams({ query: value })}`, { cache: "no-store", signal: controller.signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Search failed");
      if (controller.signal.aborted) return;
      const items = Array.isArray(data?.products) ? data.products : [];
      if (!items.length) throw new Error("Товары не найдены");
      if (items.length === 1) setProduct(items[0]);
      else setResults(items);

    } catch (error) {
      if (!controller.signal.aborted) toast.error(error.message || "Ошибка поиска товара");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  const addToPrintQueue = async (kind) => {
    if (!product?.code) return;
    setAdding(kind);
    try {
      const response = await fetch(`/api/shop/${kind === "label" ? "labels" : "barcodes"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kind === "label"
          ? { code: product.code, shop }
          : { code: product.code, amount: Number(barcodeAmount), shop }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Не удалось добавить в очередь печати");
      toast.success(kind === "label" ? "Ценник добавлен в очередь" : "Штрихкоды добавлены в очередь");
      setQuery("");
      if (kind === "label") showLabels({ shop, queueShop: shop });
      else showBarcodes({ shop });
    } catch (error) {
      toast.error(error.message || "Ошибка добавления в очередь печати");
    } finally {
      setAdding("");
    }
  };

  const totalInShops = shops.reduce((total, shop) => {
    const sizes = product?.sizes_all?.[String(shop.id)] || [];
    return total + sizes.reduce((sum, item) => sum + (Number(item.q) || 0), 0);
  }, 0);
  const productImage = product?.small_image || product?.images?.[0];

  return (
    <section className="container page">
      <S.PageTitle>Перегляд товару</S.PageTitle>
      <S.SearchForm onSubmit={search}>
        <S.SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Введіть код товару чи модель"
          aria-label="Код товару чи модель"
        />
        <S.SearchButton type="submit" disabled={loading || !query.trim()}>
          {loading ? "Пошук…" : "Знайти"}
        </S.SearchButton>
      </S.SearchForm>
      <S.PageActions>
        <S.ActionButton type="button" onClick={() => showBarcodes({ shop })}>
          Друк штрихкодів
        </S.ActionButton>
        {shop != null && (
          <S.ActionButton type="button" onClick={() => showLabels({ shop, queueShop: shop })}>
            Цінники shop: {shop}
          </S.ActionButton>
        )}
        <S.ActionButton type="button" onClick={() => showLabels({ shop, queueShop: 0 })}>
          Цінники shop: 0
        </S.ActionButton>
      </S.PageActions>

      {!!results.length && (
        <S.Results aria-label="Результати пошуку">
          {results.map((item) => (
            <S.ResultButton type="button" key={item._id || item.code} onClick={() => { setProduct(item); setResults([]); }}>
              <strong>{item.code}</strong><span>{getVendor(item.vendor)} {item.model}</span>
            </S.ResultButton>
          ))}
        </S.Results>
      )}

      {product && (
        <S.ProductCard>
          <S.ProductTop hasImage={!!productImage}>
            {productImage && (
              <S.ProductImage>
                <ImageWrapper src={productImage} alt={`${product.code} ${product.model || ""}`} fill />
              </S.ProductImage>
            )}
            <S.ProductInfo>
            <S.InfoItem><S.InfoLabel>Код товару</S.InfoLabel><strong>{product.code}</strong></S.InfoItem>
            <S.InfoItem><S.InfoLabel>Марка</S.InfoLabel><strong>{getVendor(product.vendor) || "—"}</strong></S.InfoItem>
            <S.InfoItem><S.InfoLabel>Модель</S.InfoLabel><strong>{product.model || "—"}</strong></S.InfoItem>
            <S.InfoItem><S.InfoLabel>Штрихкоди товару</S.InfoLabel><strong>{product.barcodes?.length ? product.barcodes.join(", ") : "—"}</strong></S.InfoItem>
            <S.InfoItem><S.InfoLabel>Ціна</S.InfoLabel>{product.price2 && <strong>{product.price2}</strong>}<strong>{product.price}</strong></S.InfoItem>
            </S.ProductInfo>
          </S.ProductTop>

          <S.StockHeading>Залишки по магазинах <S.Total>{totalInShops} пар всього</S.Total></S.StockHeading>
          <S.Stores>
            {shops.map((shop) => {
              const sizes = product.sizes_all?.[String(shop.id)] || [];
              const amount = sizes.reduce((sum, item) => sum + (Number(item.q) || 0), 0);
              return (
                <S.StoreCard key={shop.id}>
                  <S.StoreHeading><strong>Магазин {shop.id}</strong><span>{amount} пар</span></S.StoreHeading>
                  {sizes.length ? <Sizes sizes={sizes} item={product} info isShop shop={String(shop.id)} /> : <S.NoStock>Нема залишків</S.NoStock>}
                </S.StoreCard>
              );
            })}
          </S.Stores>

          <S.PrintActions>
            <S.ActionButton type="button" disabled={!!adding} onClick={() => addToPrintQueue("label")}>
              {adding === "label" ? "Додаємо…" : "Додати цінник для друку"}
            </S.ActionButton>
            <S.BarcodeAction>
              <label htmlFor="barcode-amount">Кількість штрихкодів</label>
              <S.AmountInput id="barcode-amount" type="number" min="1" step="1" value={barcodeAmount} onChange={(event) => setBarcodeAmount(event.target.value)} />
              <S.ActionButton type="button" disabled={!!adding || !Number.isSafeInteger(Number(barcodeAmount)) || Number(barcodeAmount) < 1} onClick={() => addToPrintQueue("barcode")}>
                {adding === "barcode" ? "Додаємо…" : "Додати штрихкоди"}
              </S.ActionButton>
            </S.BarcodeAction>
          </S.PrintActions>
        </S.ProductCard>
      )}
    </section>
  );
};

export default ProductPage;
