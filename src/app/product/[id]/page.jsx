import { fetchProduct } from "@/helpers/useFetchProduct";
import ProductClient from "@/components/Product/ProductClient";

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await fetchProduct({ id });

  return <ProductClient product={product} />;
}
