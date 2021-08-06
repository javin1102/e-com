import axios from "axios";
import { base_url, productsLimit } from "../../utils/utils";
import { messageAction } from "../message-slice";
import { productListAction } from "./productlist-slice";
export const getAllProductsAction = () => {
  return async (dispatch) => {
    const getProductsRequest = async () => {
      const response = await axios.get(
        `${base_url}/products?limit=${productsLimit}`
      );
      return response;
    };
    try {
      dispatch(
        messageAction.showNotification({ message: "Loading", status: null })
      );
      const res = await getProductsRequest();
      dispatch(productListAction.reset());
      dispatch(productListAction.getProductList({ results: res.data }));
      dispatch(
        messageAction.showNotification({ message: "Success", status: 200 })
      );
    } catch (err) {
      console.error(err);
      dispatch(productListAction.reset());
      dispatch(
        messageAction.showNotification({
          message: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  };
};
