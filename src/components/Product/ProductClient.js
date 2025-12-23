"use client";

import { useQuery } from "@tanstack/react-query";
import Product from "@/components/Product/Product";

const fetchProductById = async (code) => {
  const res = await fetch(`/api/product/${code}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export default function ProductClient({ product }) {
  const { data } = useQuery({
    queryKey: ["product", product?.code],
    queryFn: () => fetchProductById(product.code),
    initialData: product,
  });

  return <Product product={data} />;
}
