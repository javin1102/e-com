import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  isAuthenticated: false,
  store: {
    id: null,
    name: null,
    products: [],
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => initialState,
    authenticate(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    getStoreData(state, action) {
      state.store.id = action.payload.storeId;
      state.store.name = action.payload.storeName;
    },
    getProductData(state, action) {
      state.store.products = action.payload.products;
    },
    logoutUser(state, action) {
      return initialState;
    },
  },
});
export const userAction = userSlice.actions;
export default userSlice;
