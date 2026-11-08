import * as S from "./styles";
import { getColorById, getVendor } from "@/data/getData";

const LabelItem = ({ item, shop }) => {
  const isDiscounted = Number(item.price) > 0 && Number(item.price2) > 0;
  console.log(isDiscounted)
  const sizesByShop = item.sizes_all ?? {};
  const shopSizes = shop ? (sizesByShop[String(shop)] ?? []) : [
    ...(sizesByShop["1"] ?? []),
    ...(sizesByShop["2"] ?? []),
  ];
  const sizes = Object.values(shopSizes.reduce((bySize, entry) => {
    if (!entry.size || Number(entry.q) <= 0) return bySize;
    const key = String(entry.size);
    bySize[key] = { size: entry.size, quantity: (bySize[key]?.quantity ?? 0) + Number(entry.q) };
    return bySize;
  }, {})).sort((a, b) => String(a.size).localeCompare(String(b.size), undefined, { numeric: true }));
  const getShopQuantity = (shopId) => (sizesByShop[shopId] ?? [])
    .reduce((total, size) => total + (Number(size.q) || 0), 0);
  const otherShop = String(shop) === "1" ? "2" : String(shop) === "2" ? "1" : null;
  const printedAt = new Date().toLocaleDateString("uk-UA");
  const primaryCode = String(item.code ?? "").trim();
  const otherBarcodes = [...new Set(
    (Array.isArray(item.barcodes) ? item.barcodes : [])
      .map((barcode) => (typeof barcode === "object" ? barcode?.code ?? barcode?.barcode : barcode))
      .map((barcode) => String(barcode ?? "").trim())
      .filter((barcode) => /^\d{6}$/.test(barcode) && barcode !== primaryCode)
  )];
  const barcodeText = [primaryCode, ...otherBarcodes].filter(Boolean).join(", ");
  const barcodeFontSize = Math.max(2.5, Math.min(6.5, 120 / Math.max(barcodeText.length, 1)));

  return (
    <S.Container>
      <S.LabelHeader>
        <S.LabelCode style={{ fontSize: `${barcodeFontSize}pt` }}>{barcodeText}</S.LabelCode>

        <S.LabelAvanti>АВАНТІ</S.LabelAvanti>
      </S.LabelHeader>
      <S.Flex>
         <S.LabelModel>{getVendor(item.vendor)}</S.LabelModel>
        <S.LabelModel>{item.model || item.name}</S.LabelModel>
        <S.LabelModel>{getColorById(item.color, 'ukr') || "—"}</S.LabelModel>
      </S.Flex>

      <S.LabelSizes>
        {sizes.length
          ? sizes.map(({ size, quantity }) => (
              <S.SizeCell key={size}>
                <S.SizeValue>{size}
                  <S.SizeQuantity>{quantity}</S.SizeQuantity>
                </S.SizeValue>
              </S.SizeCell>
            ))
          : "—"}
      </S.LabelSizes>

      <S.PriceBlock>
        {isDiscounted && (
          <S.OriginalPrice>
            {Number(item.price2 || 0).toFixed(2).replace(".", ",")}
          </S.OriginalPrice>
        )}
        <S.LabelPrice isDiscounted={isDiscounted}>
          {Number(item.price || 0).toFixed(2).replace(".", ",")}
           <S.LabelCurrency>{"\u0433\u0440\u043d"}</S.LabelCurrency>
        </S.LabelPrice>
      </S.PriceBlock>
      <S.PrintFooter>
        <S.StockCounts>
          {otherShop
            ? `\u0410${shop}: ${getShopQuantity(shop)} | \u0410${otherShop}: ${getShopQuantity(otherShop)}`
            : `\u04101: ${getShopQuantity("1")} | \u04102: ${getShopQuantity("2")}`}
        </S.StockCounts>
        <S.PrintDate>{printedAt}</S.PrintDate>
      </S.PrintFooter>
    </S.Container>
  );
};

export default LabelItem;
