import { fetchProduct } from "@/helpers/useFetchProduct";
import ProductClient from "@/components/Product/ProductClient";

export async function generateMetadata({ params }) {
  const product = await fetch(`https://api.avanti-shoes.com.ua/product/${params.code}`).then(res => res.json())

  return {
    title: `${product.name} — купити з доставкою`,
    description: product.shortDescription,
    alternates: {
      canonical: `https://avanti-shoes.com.ua/product/${product.code}`,
    },
    openGraph: {
      title: product.name,
      images: [product.image],
    },
  }
}


export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await fetchProduct({ id });

  return <ProductClient product={product} />;
}
