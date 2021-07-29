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
      console.log(res);
      dispatch(
        messageAction.showNotification({
          status: res.status,
          message: res.data.msg,
        })
      );
      dispatch(
        userAction.authenticate({
          token: res.data.token,
          isAuthenticated: true,
        })
      );
    } catch (err) {
      console.error(err.response.status);
      dispatch(
        messageAction.showNotification({
          status: err.response.status,
          message: err.response.data.msg,
        })
      );
    }
  };
};
