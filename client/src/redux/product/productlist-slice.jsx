import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  results: {
    results: [],
    maxPages: 1,
  },
  searchResults: { results: [], maxPages: 1 },
};
const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    getProductList(state, action) {
      state.results = action.payload.results;
    },
    getSearchProductList(state, action) {
      state.searchResults = action.payload.searchResults;
    },
    resetSearchResults: (state) => {
      state.searchResults = {};
    },
    resetResults: (state) => {
      state.results = {};
    },
  },
});

export const productListAction = productListSlice.actions;
export default productListSlice;
