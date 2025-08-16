import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenMenu: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsOpenMenu: (state, action) => {
      state.isOpenMenu = action.payload;
    },
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
  },
});
