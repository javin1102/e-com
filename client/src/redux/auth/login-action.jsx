import { userAction } from "../user-slice";
import { messageAction } from "../message-slice";
import axios from "axios";
export const loginUser = (data, rememberMe) => {
  return async (dispatch) => {
    const loginRequest = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(data);

      const response = await axios.post(
        "http://localhost:5000/api/auth",
        body,
        config
      );
      return response;
    };

    try {
      const res = await loginRequest();
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
      if (rememberMe) {
        localStorage.setItem("x-auth-token", res.data.token);
      }
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
