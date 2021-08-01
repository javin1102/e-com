import { userAction } from "../user-slice";
import axios from "axios";
import { base_url } from "../../utils/utils";
import { messageAction } from "../message-slice";
export const getStoreAction = (token) => {
  return async (dispatch) => {
    const getStoreRequest = async () => {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      const response = await axios.get(`${base_url}/store`, config);
      return response;
    };
    try {
      const res = await getStoreRequest();
      dispatch(
        userAction.getStoreData({
          storeId: res.data._id,
          products: res.data.products,
          storeName: res.data.name,
        })
      );
    } catch (err) {
      console.error(err.response.status);
      dispatch(
        userAction.getStoreData({
          storeId: null,
          products: [],
          storeName: null,
        })
      );
    }
  };
};

export const registerStoreAction = (data, token) => {
  return async (dispatch) => {
    const registerStoreRequest = async () => {
      const config = {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(data);
      const response = await axios.post(`${base_url}/store`, body, config);
      return response;
    };

    try {
      const res = await registerStoreRequest();
      dispatch(
        userAction.getStoreData({
          storeId: res.data._id,
          products: res.data.products,
          storeName: res.data.name,
        })
      );
    } catch (err) {
      console.error(err.response);
      dispatch(
        userAction.getStoreData({
          storeId: null,
          products: [],
          storeName: null,
        })
      );
    }
  };
};

export const addProductAction = (data, token) => {
  return async (dispatch) => {
    const addProductRequest = async () => {
      const config = {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
        },
      };
      const body = JSON.stringify(data);
      const response = await axios.post(
        `${base_url}/store/product`,
        body,
        config
      );
      return response;
    };
    try {
      const res = await addProductRequest();
      console.log(res);
      dispatch(
        messageAction.showNotification({
          status: res.status,
          message: res.data.message,
        })
      );
    } catch (err) {
      console.error(err.response);
      dispatch(
        messageAction.showNotification({
          status: err.response.status,
          message: err.response.data.msg,
        })
      );
    }
  };
};
