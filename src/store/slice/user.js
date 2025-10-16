import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      if (state?.user?.user?.id) state.user.user.id = action.payload?.id;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isAuth = false;
    },
    changeAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    updateUser: (state, action) => {
      state.user.user = action.payload;
    },
    changeUserDeliveryData: (state, action) => {
      state.user.user.city = action.payload.city;
      state.user.user.address = action.payload.address;
    },
  },
});
