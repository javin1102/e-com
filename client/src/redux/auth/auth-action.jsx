import axios from "axios";
import { messageAction } from "../message-slice";
import { userAction } from "../user-slice";

export const authAction = () => {
  return async (dispatch) => {
    const authRequest = async () => {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token").toString(),
        },
      };
      const response = await axios.get(
        "http://localhost:5000/api/auth",
        config
      );
      return response;
    };
    try {
      const res = await authRequest();
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
      dispatch(
        userAction.authenticate({
          token: "",
          isAuthenticated: false,
        })
      );
    }
  };
};
