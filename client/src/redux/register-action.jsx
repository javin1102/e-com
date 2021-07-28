import axios from "axios";
import { messageAction } from "./message-slice";
import { userAction } from "./user-slice";
export const registerUser = (data) => {
  return async (dispatch) => {
    const registerRequest = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(data);
      const res = await axios.post(
        "http://localhost:5000/api/register",
        body,
        config
      );
      return res;
    };

    try {
      const res = await registerRequest();
      dispatch(
        messageAction.showNotification({
          status: 200,
          message: "Register successfully",
        })
      );
      dispatch(
        userAction.authenticate({
          token: res.data,
          isAuthenticated: true,
        })
      );
    } catch (err) {
      console.error(err);
      dispatch(
        messageAction.showNotification({
          status: 500,
          message: "Failed to register",
        })
      );
    }
  };
};
