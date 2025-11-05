// store/slice/cart.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchServerCartAPI,
  addItemsToServerCartAPI,
  addItemToCartAPI,
} from "@/helpers/api/cart";

// thunk: загрузить корзину
export const fetchServerCart = createAsyncThunk(
  "cart/fetchServerCart",
  async (userId) => {
    const res = await fetchServerCartAPI(userId);
    return res; // массив
  }
);

// thunk: добавить локальные товары на сервер и вернуть обновлённую корзину
export const addItemsToServerCart = createAsyncThunk(
  "cart/addItemsToServerCart",
  async ({ localItems, userId }) => {
    const response = await addItemsToServerCartAPI(localItems, userId);
    console.log(response)
    return response.items;
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({item, userId }) => {
    const response = await addItemToCartAPI(item, userId);
    console.log(response)
    return response.items;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
    addItemToCartNonauth: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    deleteItenFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchServerCart
      .addCase(fetchServerCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServerCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchServerCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "fetchServerCart error";
      })
      // addItemsToServerCart
      .addCase(addItemsToServerCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addItemsToServerCart.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.items = action.payload;
      })
      .addCase(addItemsToServerCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "addItemsToServerCart error";
      })
      // addItemToCart
       .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "addItemToCart error";
      })
  },
});

export const { setCartItems, clearCart, addItemToCartNonauth, deleteItenFromCart } =
  cartSlice.actions;
