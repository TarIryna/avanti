import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  orders: { new: [], success: [], progress: [], error: [] },
  isLoading: false,
  isError: false,
};

export const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    changeuserId: (state, action) => {
      state.userId = action.payload;
    },
    changeIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    changeisError: (state, action) => {
      state.isError = action.payload;
    },
    changeAllOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    changeToInitial: (state, action) => {
      state.userId = "";
      state.orders = { new: [], success: [], progress: [], error: [] };
      state.isLoading = false;
      state.isError = false;
    },
    changeNewOrderByNonauthUser: (state, action) => {
      state.orders.new = action.payload;
    },
  },
});
