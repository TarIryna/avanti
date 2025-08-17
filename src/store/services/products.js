import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const axiosInstance = axios.create({
  baseURL: "https://flex-dev.cosmicslot.com/en",
});
export class ProductsService {
  static fetchGames = createAsyncThunk(
    "ProductsService/fetchProducts",
    async (params, redux) => {
      const {
        query,
        page,
        pages,
        quantity,
        provider,
        collection,
        gender,
        material,
        color,
        sortBy,
      } = params;
      let url = "";
      if (query?.length > 0) {
        try {
          const { data } = await axiosInstance({
            url: "/search",
            method: "POST",
            params: { query, _limit: quantity, _page: page },
          });
          return data;
        } catch (error) {
          return redux.rejectWithValue(error);
        }
      } else {
        if (query === "" && !provider && !collection) {
          url = `/game/list?gender=${gender}&material=${material}&color=${color}&_limit=${quantity}&_page=${page}`;
        }
        if (provider) {
          const brand = provider.toLowerCase();
          url = `/game/list?brand=${brand}&_limit=${quantity}&_page=${page}`;
        }
        if (collection) {
          const col = collection.toLowerCase();
          url = `/game/list?collection=${col}&_limit=${quantity}&_page=${page}`;
        }
        try {
          const { data } = await axiosInstance({
            url,
            method: "GET",
          });
          return data;
        } catch (error) {
          return redux.rejectWithValue(error);
        }
      }
    }
  );
}
