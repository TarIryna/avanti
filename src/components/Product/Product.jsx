import Sizes from "./Sizes";
import Gallary from "./Gallary";
import Description from "./Description";
import { capitalize } from "@/helpers/capitalize";
import * as S from "./styles";
import { getVendor } from "@/data/getData";


const Product = ({ product }) => {
  const images = product.images

  const sizes = product.type === 3 ? [{size: product.color ?? "колір", q: 1}] : product?.sizes?.length > 0 ? product.sizes : [{size: "один розмір", q: 1}]
  return (
    <>
      {product && (
        <S.ProductWrapper className="page">
          <h1>
            {product.name} {getVendor(product.vendor)} {product.model}
          </h1>
          {!!images.length && <Gallary images={images} />}
          <S.Content>
            <S.Name>{`${capitalize(product.name)} ${getVendor(product.vendor)} ${product.model ?? ""}`}</S.Name>
            <Description data={product} />
            <Sizes sizes={sizes} item={product} />
          </S.Content>
        </S.ProductWrapper>
      )}
    </>
  );
};

export default Product;
