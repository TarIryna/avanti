import {
  changeIsLoadingAction,
  changeProductsAction,
} from "@/store/actions/products";

export const fetchProductsByParams = async ({
  gender,
  season,
  view,
  color,
  sort,
  material,
  size,
  type = "shoes",
  limit = 24,
  page = 1,
}) => {
  try {
    changeIsLoadingAction(true);
    const params = { gender, limit, page };
    if (season) params.season = season;
    if (view) params.view = view;
    if (color) params.color = color;
    if (size) params.sizes = size;
    if (material) params.material = material;
    if (sort) params.sort = sort;
    if (type) params.type = type;

    const queryString = new URLSearchParams(params).toString();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(
      `${baseUrl}/api/products/filter?${queryString}`,
      { cache: "no-store" }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsByQuery = async ({
  query = "",
  limit = 24,
  page = 1,
}) => {
  try {
    changeIsLoadingAction(true);
    const response = await fetch(
      `/api/products/search?query=${query}&sortBy=${sortBy}&limit=${limit}&page=${page}`,
      { cache: "no-store" }
    );

    if (response.ok) {
      const data = await response.json();
      changeProductsAction(data);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const fetchProductsMain = async ({ limit = 24, page = 1 }) => {
//   console.log(limit, page);
//   const month = new Date().getMonth() + 1;
//   const currentSeason =
//     month < 3 || month === 12 || month === 11
//       ? "winter"
//       : month === 10 || month === 9
//       ? "demi"
//       : month >= 3 && month < 6
//       ? "autumn"
//       : month >= 6 && month < 9
//       ? "summer"
//       : "autumn";
//   try {
//     changeIsLoadingAction(true);
//     const response = await fetch(
//       `/api/products?sortBy=${sortBy}&limit=${limit}&page=${page}&season=${currentSeason}`
//     );

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
