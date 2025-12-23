import Collection from "@/components/Collection/Collection/Collection";
import { fetchProductsByParams } from "@/helpers/useFetchProducts";
import { redirect } from "next/navigation";

export default async function PageGender({ params, searchParams }) {
  const gender = params.gender;
  const page = Number(searchParams.page ?? 1);
  const limit = Number(searchParams.limit ?? 24);
  const season = searchParams?.season;
  const view = searchParams?.view;
  const color = searchParams?.color;
  const size = searchParams?.size;
  const sort = searchParams?.sort;
  const material = searchParams?.material;
  const type = searchParams?.type;
  const searchQuery = searchParams?.query;
  const basePath = `/${params.gender}`;
  const queryParams = { page, limit };
  if (season) queryParams.season = season;
  if (view) queryParams.view = view;
  if (color) queryParams.color = color;
  if (size) queryParams.size = size;
  if (sort) queryParams.sort = sort;
  if (material) queryParams.material = material;
  if (type) queryParams.type = type;
  if (searchQuery) queryParams.query = searchQuery;
  const query = new URLSearchParams(queryParams);
  // добавляем дефолтные, если их нет
  if (!query?.has("page")) query.set("page", "1");
  if (!query?.has("limit")) query.set("limit", "24");

  // если чего-то не хватало — делаем redirect
  if (!searchParams.page || !searchParams.limit) {
    return redirect(`${basePath}?${query.toString()}`);
  }

  const data = await fetchProductsByParams({
    gender,
    ...queryParams,
  });

  return (
    <Collection
      initialData={data}
      params={params}
      searchParams={searchParams}
    />
  );
}
