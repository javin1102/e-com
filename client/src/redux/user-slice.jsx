import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    isAuthenticated: false,
    store: {
      id: null,
      name: null,
      products: [],
    },
  },
  reducers: {
    authenticate(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    getStoreData(state, action) {
      state.store.id = action.payload.storeId;
      state.store.products = action.payload.products;
      state.store.name = action.payload.storeName;
    },
    logoutUser(state, action) {
      state.token = "";
      state.isAuthenticated = false;
      state.store = {
        id: null,
        name: null,
        products: [],
      };
    },
  },
});
export const userAction = userSlice.actions;
export default userSlice;
