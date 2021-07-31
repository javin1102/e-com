import axios from "axios";
import { messageAction } from "../message-slice";
import { userAction } from "../user-slice";

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
      sessionStorage.setItem("x-auth-token", res.data.token);
    } catch (err) {
      console.error(err.response.status);
      dispatch(
        messageAction.showNotification({
          status: err.response.status,
          message: err.response.data.msg,
        })
      );
      dispatch(
        userAction.authenticate({
          token: "",
          isAuthenticated: false,
        })
      );
    }
  };
};
