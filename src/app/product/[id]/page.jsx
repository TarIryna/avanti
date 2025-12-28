import { fetchProduct } from "@/helpers/useFetchProduct";
import ProductClient from "@/components/Product/ProductClient";

export async function generateMetadata({ params }) {
  let product = null

  try {
    const res = await fetch(`https://api.avanti-shoes.com.ua/product/${params.id}`)

    if (!res.ok) {
      console.error('Product API error', res.status)
      return {
        title: `${params?.id ?? 'Товар'} купити з доставкою`,
        description: '',
        alternates: { canonical: `https://avanti-shoes.com.ua/product/${params.id}` },
      }
    }

    // Попытка распарсить JSON
    product = await res.json()
  } catch (err) {
    console.error('Failed to fetch product', err)
    return {
      title: `${params?.code ?? 'Товар'} купити з доставкою`,
      description: '',
      alternates: { canonical: `https://avanti-shoes.com.ua/product/${params.code}` },
    }
  }

  return {
    title: `${product.name} — купити з доставкою`,
    description: product.shortDescription || '',
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
