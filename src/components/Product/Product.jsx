import Sizes from "./Sizes";
import Gallary from "./Gallary";
import Description from "./Description";
import { capitalize } from "@/helpers/capitalize";
import * as S from "./styles";

const Product = ({ product }) => {
  const images = [product?.image1, product?.image2, product?.image3].filter(
    Boolean
  );

  const sizes = product?.sizes && typeof product.sizes === 'string' ? product?.sizes?.split(" ") : [product.sizes];

  return (
    <>
      {product && (
        <S.ProductWrapper className="page">
          {!!images.length && <Gallary images={images} />}
          <S.Content>
            <S.Name>{capitalize(product.name)}</S.Name>
            <Description data={product} />
            <Sizes sizes={sizes} item={product} />
          </S.Content>
        </S.ProductWrapper>
      )}
    </>
  );
};

export default Product;
