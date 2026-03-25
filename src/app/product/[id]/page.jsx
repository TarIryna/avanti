import { fetchProduct } from "@/helpers/useFetchProduct";
import ProductClient from "@/components/Product/ProductClient";
import { getVendor } from "@/data/getData";

export async function generateMetadata({ params }) {
  const product = await fetchProduct({ id: params.id });
  if (!product) {
    return {
      title: "Товар не знайдено",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} виробник ${getVendor(product?.vendor)} ${product.model ?? ""} — купити з доставкою`,
    description: product.shortDescription || "",
    alternates: {
      canonical: `https://avanti-shoes.com.ua/product/${product.code}`,
    },
    openGraph: {
      title: `${product.name} ${getVendor(product?.vendor)}`,
      images: product.images ?? [],
    },
  };
}


export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await fetchProduct({ id });

  return <ProductClient product={product} />;
}
