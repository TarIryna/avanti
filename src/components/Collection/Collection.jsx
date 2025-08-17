"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mui/material";
import List from "./CardList";
import Filter from "./Filter";

export default function Collection({ initialData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pages =
    initialData?.total && initialData.total / (initialData.limit ?? 24);
  const pathname = usePathname();
  const page = Number(searchParams.get("page") ?? 1);

  const handleChangePage = (_event, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="container page">
      <Filter />
      {initialData && <List data={initialData.products} />}
      {initialData && pages && pages > 1 && (
        <Pagination
          count={initialData.pages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      )}
    </section>
  );
}
