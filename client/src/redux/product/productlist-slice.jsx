import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  results: {},
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
      console.log(state.results);
    },
  },
});

export const productListAction = productListSlice.actions;
export default productListSlice;
