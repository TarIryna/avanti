import Sizes from "./Sizes";
import Gallary from "./Gallary";
import Description from "./Description";
import { capitalize } from "@/helpers/capitalize";
import * as S from "./styles";

const Product = ({ product }) => {
  const images = [product.image1, product.image2, product.image3].filter(
    Boolean
  );
  const sizes = product?.sizes ? product.sizes.split(" ") : [];

  const sendEmail = () => {
    // TODO
  };

  return (
    <>
      {product && (
        <S.ProductWrapper>
          {!!images.length && <Gallary images={images} />}
          <S.Content>
            <S.Name>{capitalize(product.name)}</S.Name>
            <Description data={product} />
            {!!sizes?.length ? (
              <Sizes sizes={sizes} item={product} />
            ) : (
              <S.ButtonAsk onClick={sendEmail}>
                Запитати про наявність
              </S.ButtonAsk>
            )}
          </S.Content>
        </S.ProductWrapper>
      )}
    </>
  );
};

export default Product;
