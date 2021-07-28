import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./message-slice";
import userSlice from "./user-slice";
const store = configureStore({
  reducer: {
    message: messageSlice.reducer,
    user: userSlice.reducer,
  },
});
export default store;
