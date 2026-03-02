import { fetchProduct } from "@/helpers/useFetchProduct";
import ProductClient from "@/components/Product/ProductClient";

export async function generateMetadata({ params }) {
  const product = await fetchProduct({ id: params.id });
  if (!product) {
    return {
      title: "Товар не знайдено",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} виробник ${product?.vendor ?? ''} — купити з доставкою`,
    description: product.shortDescription || "",
    alternates: {
      canonical: `https://avanti-shoes.com.ua/product/${product.code}`,
    },
    openGraph: {
      title: `${product.name} ${product?.vendor ?? ''}`,
      images: product.image1
        ? [{ url: product.image1 }]
        : [],
    },
  };
}


export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await fetchProduct({ id });

  return <ProductClient product={product} />;
}
