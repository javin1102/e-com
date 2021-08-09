import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
  name: "message",
  initialState: {
    status: null,
    message: null,
  },
  reducers: {
    showNotification(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    reset(state) {
      state.message = null;
      state.status = null;
    },
  },
});
export const messageAction = messageSlice.actions;
export default messageSlice;
