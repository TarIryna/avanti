import {
  changeIsLoadingAction,
  changeProductsAction,
} from "@/store/actions/products";

export const fetchProductsByParams = async ({
  gender,
  season,
  view,
  color,
  sortBy,
  material,
  size,
  pageSize = 24,
  page = 1,
}) => {
  try {
    changeIsLoadingAction(true);
    const response = await fetch(
      `/api/products/filter?gender=${gender}&view=${view}&season=${season}&size=${size}&material=${material}&color=${color}&sortBy=${sortBy}&pagesize=${pageSize}&page=${page}`
    );
    if (response.ok) {
      console.log("response ok");
      const data = await response.json();
      changeProductsAction(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsByQuery = async ({
  query = "",
  pageSize = 24,
  page = 1,
}) => {
  try {
    changeIsLoadingAction(true);
    const response = await fetch(
      `/api/products/search?query=${query}&sortBy=${sortBy}&pagesize=${pageSize}&page=${page}`
    );

    if (response.ok) {
      const data = await response.json();
      changeProductsAction(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsMain = async ({ pageSize = 24, page = 1 }) => {
  console.log(pageSize, page);
  const month = new Date().getMonth() + 1;
  const currentSeason =
    month < 3 || month === 12 || month === 11
      ? "winter"
      : month === 10 || month === 9
      ? "demi"
      : month >= 3 && month < 6
      ? "autumn"
      : month >= 6 && month < 9
      ? "summer"
      : "autumn";
  try {
    changeIsLoadingAction(true);
    const response = await fetch(
      `/api/products?sortBy=${sortBy}&pagesize=${pageSize}&page=${page}&season=${currentSeason}`
    );

    if (response.ok) {
      const data = await response.json();
      changeProductsAction(data);
    }
  } catch (error) {
    console.log(error);
  }
};
