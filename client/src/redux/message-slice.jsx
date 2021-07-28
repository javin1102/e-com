import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
  name: "message",
  initialState: {
    status: 200,
    message: null,
  },
  reducers: {
    showNotification(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});
export const messageAction = messageSlice.actions;
export default messageSlice;
