import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  orders: [],
  city: null,
  address: null,
  name: null,
  surname: null,
  phone: null,
  isViber: false,
  isLoading: false,
};

export const newOrderSlice = createSlice({
  name: "neworder",
  initialState,
  reducers: {
    changeIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    changeOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    changeUserInfo: (state, action) => {
      state.userId = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.phone = action.payload.phone;
      state.isViber = action.payload.isViber;
    },
    changeDeliveryInfo: (state, action) => {
      state.city = action.payload.city?.name ?? action.payload.city;
      state.address = action.payload.address?.name ?? action.payload.address;
    },
    changeToInitial: (state, action) => {
      state.userId = "";
      state.orders = [];
      state.city = null;
      state.address = null;
      state.name = null;
      state.surname = null;
      state.phone = null;
      state.isLoading = false;
      state.isViber = false;
    },
  },
});
