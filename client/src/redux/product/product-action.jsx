import axios from "axios";
import { messageAction } from "../message-slice";
import { productListAction } from "./productlist-slice";
import { productsLimit } from "../../utils/utils";
export const getAllProductsAction = () => {
  return async (dispatch) => {
    const getProductsRequest = async () => {
      const response = await axios.get(`/api/products?limit=100`);
      return response;
    };
    try {
      dispatch(
        messageAction.showNotification({ message: "Loading", status: null })
      );
      const res = await getProductsRequest();
      // dispatch(productListAction.resetResults());
      dispatch(productListAction.getProductList({ results: res.data }));
      dispatch(
        messageAction.showNotification({ message: "Success", status: 200 })
      );
    } catch (err) {
      // console.error(err);
      dispatch(productListAction.resetResults());
      dispatch(
        messageAction.showNotification({
          message: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  };
};

export const getSearchProductsAction = (searchKey) => {
  return async (dispatch) => {
    const getSearchProductRequest = async () => {
      const response = await axios.get(
        `/api/products?search=${searchKey}&limit=100`
      );
      return response;
    };
    try {
      dispatch(
        messageAction.showNotification({ message: "Loading", status: null })
      );
      const res = await getSearchProductRequest();
      dispatch(productListAction.resetSearchResults());
      dispatch(
        productListAction.getSearchProductList({ searchResults: res.data })
      );
      dispatch(
        messageAction.showNotification({ message: "Success", status: 200 })
      );
    } catch (err) {
      dispatch(productListAction.resetSearchResults());
      dispatch(
        messageAction.showNotification({
          message: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  };
};
