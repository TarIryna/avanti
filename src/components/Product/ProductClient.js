"use client";

import { useQuery } from "@tanstack/react-query";
import Product from "@/components/Product/Product";

const fetchProductById = async (id) => {
  const res = await fetch(`/api/product/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export default function ProductClient({ product }) {
  const { data } = useQuery({
    queryKey: ["product", product._id],
    queryFn: () => fetchProductById(product._id),
    initialData: product,
  });

  return <Product product={data} />;
}
