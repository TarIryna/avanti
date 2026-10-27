import { getVendor } from "@/data";
import ImageWrapper from "@/components/Product/ImageWrapper";
import * as S from "./styles";

const asNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const ProductResult = ({ product }) => {
  if (!product) return null;

  const start = asNumber(product.start);
  const revenue = asNumber(product.res);
  const totalGot = asNumber(product.totalGot);
  const sold = asNumber(product.pop);
  const result = Number.isFinite(Number(product.activityResult))
    ? Number(product.activityResult)
    : revenue - start;
  const sellThrough = totalGot ? (sold / totalGot) * 100 : 0;
  const profitability = start ? (result / start) * 100 : 0;
  const image = product.small_image || product.images?.[0];

  return (
    <S.Wrapper>
      <S.ProductHeader>
        <S.ProductImage>
          {image && <ImageWrapper src={image} alt={`Товар ${product.code}`} fill />}
        </S.ProductImage>
        <S.Title>
          Код {product.code} · {getVendor(product.vendor)} · {product.model || product.name || ""}
        </S.Title>
      </S.ProductHeader>
      <S.Table>
        <thead>
          <tr>
            <th>Витрати, USD</th>
            <th>Виручка, USD</th>
            <th>Отримано, пар</th>
            <th>Продано, пар</th>
            <th>Результат, USD</th>
            <th>Продажі, %</th>
            <th>Рентабельність, %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{start.toFixed(2)}</td>
            <td>{revenue.toFixed(2)}</td>
            <td>{totalGot}</td>
            <td>{sold}</td>
            <td>{result.toFixed(2)}</td>
            <td>{sellThrough.toFixed(2)}%</td>
            <td>{profitability.toFixed(2)}%</td>
          </tr>
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default ProductResult;
