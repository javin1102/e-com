import { userAction } from "../user-slice";
import axios from "axios";
import { messageAction } from "../message-slice";
export const getStoreAction = (token) => {
  return async (dispatch) => {
    const getStoreRequest = async () => {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/store`,
        config
      );
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
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/store`,
        body,
        config
      );
      return response;
    };

    try {
      const res = await registerStoreRequest();
      dispatch(
        userAction.getStoreData({
          storeId: res.data._id,
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
        `${process.env.REACT_APP_BASE_URL}/store/product`,
        body,
        config
      );
      return response;
    };
    try {
      dispatch(
        messageAction.showNotification({
          status: null,
          message: "Loading",
        })
      );
      const res = await addProductRequest();

      dispatch(
        messageAction.showNotification({
          status: res.status,
          message: res.data.message,
        })
      );
    } catch (err) {
      dispatch(
        messageAction.showNotification({
          status: err.response.status,
          message: err.response.data.msg,
        })
      );
    }
  };
};

export const getProductsAction = (token) => {
  return async (dispatch) => {
    const getProductsRequest = async () => {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/store/product`,
        config
      );
      return response;
    };
    try {
      dispatch(
        messageAction.showNotification({
          status: null,
          message: "Loading",
        })
      );
      const res = await getProductsRequest();

      dispatch(userAction.getProductData({ products: res.data }));
      dispatch(
        messageAction.showNotification({
          status: res.status,
          message: "Success",
        })
      );
    } catch (err) {
      dispatch(
        userAction.getProductData({
          products: [],
        })
      );
      dispatch(
        messageAction.showNotification({
          status: err.response.status,
          message: err.response.data.msg,
        })
      );
    }
  };
};

export const deleteProductAction = (id, token) => {
  return async (dispatch) => {
    const deleteRequest = async () => {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/store/product/${id}`,
        config
      );
      return response;
    };
    try {
      dispatch(
        messageAction.showNotification({
          status: null,
          message: "Loading",
        })
      );
      const res = await deleteRequest();
      dispatch(userAction.getProductData({ products: res.data }));
      dispatch(
        messageAction.showNotification({
          status: res.status,
          message: "Success",
        })
      );
    } catch (err) {
      dispatch(
        messageAction.showNotification({
          status: err.response.status,
          message: err.response.data.msg,
        })
      );
    }
  };
};

export const updateProductAction = (id, data, token) => {
  return async (dispatch) => {
    const updateRequest = async () => {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      // const body = JSON.stringify(data);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/store/product/${id}`,
        data,
        config
      );
      return response;
    };

    try {
      dispatch(
        messageAction.showNotification({
          status: null,
          message: "Loading",
        })
      );
      const res = await updateRequest();

      const newProducts = res.data.map((product) => {
        const {
          date,
          _id: id,
          name,
          pathName,
          pathType,
          price,
          stock,
        } = product;
        return {
          date,
          id,
          name,
          pathName,
          pathType,
          price,
          stock,
        };
      });

      dispatch(userAction.getProductData({ products: newProducts }));
      dispatch(
        messageAction.showNotification({
          status: res.status,
          message: "Success",
        })
      );
    } catch (err) {
      console.log(err.response);
      dispatch(
        messageAction.showNotification({
          status: err.response.status,
          message: err.response.data.msg,
        })
      );
    }
  };
};
