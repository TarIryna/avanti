import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  page: 1,
  pages: 1,
  total: 0,
  quantity: 24,
  season: "",
  gender: "",
  brand: "",
  view: "",
  material: "",
  color: "",
  sortBy: "",
  products: [],
  isLoading: false,
  isError: false,
  size: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeProducts: (state, action) => {
      state.total = action.payload.total;
      state.pages = Math.ceil(action.payload.total / state.quantity);
      state.isLoading = false;
      if (state.page > 1) state.products = action.payload.products;
      else state.products = action.payload.products;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeQauntity: (state, action) => {
      state.page = 1;
      state.quantity = action.payload;
    },
    changeSeason: (state, action) => {
      state.collection = null;
      state.query = "";
      state.page = 1;
      state.season = action.payload;
    },
    changeGender: (state, action) => {
      state.query = "";
      state.page = 1;
      state.gender = action.payload;
    },
    changeView: (state, action) => {
      state.query = "";
      state.page = 1;
      state.view = action.payload;
    },
    changeQuery: (state, action) => {
      state.collection = null;
      state.page = 1;
      state.query = action.payload;
    },
    changeFilter: (state, action) => {
      state.page = 1;
      state.gender = action.payload.gender;
      state.season = action.payload.season;
      state.view = action.payload.view;
      state.size = action.payload.size;
      state.color = action.payload.color;
      state.material = action.payload.material;
      state.sortBy = action.payload.sortBy;
      state.quantity = action.payload.limit;
      state.query = "";
    },
    changeToInitial: (state) => {
      state.query = "";
      state.page = 1;
      state.pages = 1;
      state.quantity = 24;
      state.season = "";
      state.gender = "";
      state.material = "";
      state.color = "";
      state.brand = "";
      state.size = "";
      state.view = "";
      state.total = 0;
      state.sortBy = "";
      state.products = [];
      state.isLoading = false;
      state.isError = false;
    },
    changeIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    initProducts: (state, action) => {
      console.log(action.payload);
      state.products = action.payload;
    },
  },
});

export const {
  changePage,
  changePages,
  changeQauntity,
  changeCollection,
  changeProvider,
  changeQuery,
  changeGames,
  changeToInitial,
} = productsSlice?.actions;
