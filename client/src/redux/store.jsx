import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./message-slice";
import userSlice from "./user-slice";
import productListSlice from "./product/productlist-slice";
import cartSlice from "./cart/cart-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  message: messageSlice.reducer,
  productList: productListSlice.reducer,
  user: userSlice.reducer,
  cart: cartSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export default store;
