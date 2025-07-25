import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice } from "../slice/products";
import { ordersSlice } from "@/store/slice/orders";
import { userSlice } from "@/store/slice/user";
import { productSlice } from "@/store/slice/product";
import { newOrderSlice } from "@/store/slice/neworder";

export const rootReducer = combineReducers({
  products: productsSlice.reducer,
  product: productSlice.reducer,
  orders: ordersSlice.reducer,
  user: userSlice.reducer,
  neworder: newOrderSlice.reducer,
});
