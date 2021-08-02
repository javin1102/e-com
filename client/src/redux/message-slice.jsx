import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
  name: "message",
  initialState: {
    status: null,
    message: null,
  },
  reducers: {
    showNotification(state = { status: null, message: null }, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});
export const messageAction = messageSlice.actions;
export default messageSlice;
