import { createSlice } from "@reduxjs/toolkit";
const productListSlice = createSlice({
  name: "productList",
  initialState: {
    storeProducts: "null",
  },
  reducers: {
    reset: (state) => {
      return;
    },
    getProductList(state, action) {
      state.storeProducts = action.payload.productList;
    },
  },
});

export const productListAction = productListSlice.actions;
export default productListSlice;
