"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mui/material";
import List from "../CardList";
import Filter from "../Filter";
import * as S from "./styles";

export default function Collection({ initialData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pages =
    !!initialData?.total && initialData.total / (initialData.limit ?? 24);
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
      {!!pages && pages > 1 && (
        <Pagination
          count={initialData.pages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      )}
      {initialData?.total === 0 && (
        <S.Message>По вашому запиту нічого не знайдено</S.Message>
      )}
    </section>
  );
}
