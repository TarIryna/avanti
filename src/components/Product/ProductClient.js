"use client";

import { useQuery } from "@tanstack/react-query";
import Product from "@/components/Product/Product";
import { useEffect } from "react";
import { getVendor } from "@/data/getData";

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

    useEffect(() => {
    if (window?.dataLayer && product) {
      window.dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "UAH",
          value: product.price,
          items: [
            {
              item_id: product.code,
              item_name: product.name,
              price: product.price,
              item_brand: getVendor(product.vendor),
            },
          ],
        },
      });
    }
  }, [product]);

  return <Product product={data} />;
}
