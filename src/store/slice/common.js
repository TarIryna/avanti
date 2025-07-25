import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "",
  categories: [],
  faq: {},
  locale: [],
  banners: [],
  affiliatesIcons: [],
  paymentsIcons: [],
  promotions: [],
  providers: [],
  countries: [],
  payments: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateFaq: (state, action) => {
      state.faq = action.payload;
    },
    updateLocale: (state, action) => {
      state.locale = action.payload;
    },
    updateBanners: (state, action) => {
      state.banners = action.payload;
    },
    updateAffiliates: (state, action) => {
      state.affiliatesIcons = action.payload;
    },
    updatePaymentsIcons: (state, action) => {
      state.paymentsIcons = action.payload;
    },
    updatePromotions: (state, action) => {
      state.promotions = action.payload;
    },
    updateProviders: (state, action) => {
      state.providers = action.payload;
    },
    updateCountries: (state, action) => {
      state.countries = action.payload;
    },
    updatePayments: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export default commonSlice;
