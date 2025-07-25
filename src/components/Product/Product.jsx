import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchProduct } from "@/helpers/useFetchProduct";
import { useProduct } from "@/store/selectors";
import Sizes from "./Sizes";
import { loginUserAction } from "@/store/actions/user";
import Gallary from "./Gallary";
import Description from "./Description";
import { capitalize } from "@/helpers/capitalize";

const Product = () => {
  const { data: session } = useSession();
  const [images, setImages] = useState([]);
  if (session) loginUserAction(session);
  const params = useParams();
  const id = params?.id;
  const product = useProduct();
  const sizes = product?.sizes?.split(" ");

  useEffect(() => {
    let array = [];
    if (product)
      for (const [key, value] of Object.entries(product)) {
        if (key.includes("image")) {
          array.push(value);
        }
      }
    setImages(array);
  }, [product]);

  useEffect(() => {
    fetchProduct({ id });
  }, [id]);

  const sendEmail = () => {
    // TODO
  };

  return (
    <>
      {product && (
        <div
          className="product_container"
          style={{ padding: "10px 10px 20px 10px" }}
        >
          {!!images.length && <Gallary images={images} />}
          <div className="product_content_block">
            <h2 className="product_name">{capitalize(product.name)}</h2>
            <Description data={product} />
            {sizes ? (
              <Sizes sizes={sizes} item={product} />
            ) : (
              <button className="product_button_ask" onClick={sendEmail}>
                Запитати про наявність
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
