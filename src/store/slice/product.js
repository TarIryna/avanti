import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productId: "",
  productInfo: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeProductId: (state, action) => {
      state.productId = action.payload;
    },
    changeProduct: (state, action) => {
      state.productInfo = action.payload;
    },
    changeIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeProductId, changeIsLoading } = productSlice?.actions;
