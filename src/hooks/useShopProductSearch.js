"use client";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function useShopProductSearch() {
  const requests = useRef({});
  useEffect(() => () => {
    Object.values(requests.current).forEach(controller => controller.abort());
  }, []);
  return async ({ value, onClear, onResult, model = false, channel = "product" }) => {
    requests.current[channel]?.abort();
    const controller = new AbortController();
    requests.current[channel] = controller;
    onClear();
    const query = String(value ?? "").trim();
    if (!query) return;
    try {
      const url = model
        ? "/api/products/filter?" + new URLSearchParams({ gender: "all", limit: 50, page: 1, query })
        : "/api/product/" + encodeURIComponent(query);
      const response = await fetch(url, { cache: "no-store", signal: controller.signal });
      if (!response.ok) throw new Error("Не вдалося знайти товар");
      const data = await response.json();
      if (controller.signal.aborted) return;
      if (!data || (model && !data.products?.length)) {
        toast.error("Товар не знайдено!");
        return;
      }
      onResult(model ? data.products : data);
    } catch (error) {
      if (!controller.signal.aborted) toast.error(error.message);
    }
  };
}
