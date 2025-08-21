import { fetchProduct } from "@/helpers/useFetchProduct";
import Product from "@/components/Product/Product";

export default async function ProductPage({ params }) {
  const { id } = params;

  // SSR-фетч
  const product = await fetchProduct({ id });

  return <Product product={product} />;
}
