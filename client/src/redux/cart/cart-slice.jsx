import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  totalPrice: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      //expect to get (id,name,price,image,store name from action)
      //state([{id,name,price,image,store name, amount}],totalPrice)

      const { product } = action.payload;
      const { id } = product;
      const existingItemIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (existingItemIndex === -1) {
        //push product to state
        product.amount = 1;
        state.products.push(product);
      } else {
        //increase product amount
        state.products[existingItemIndex].amount += 1;
      }
      state.totalAmount += 1;
      state.totalPrice = state.products
        .map((product) => product.price * product.amount)
        .reduce((ac, cv) => ac + cv, 0);
    },
    removeProductFromCart(state, action) {
      const { product } = action.payload;
      const { id } = product;
      const existingItemIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (state.products[existingItemIndex].amount <= 1) {
        const newProducts = state.products.filter(
          (product) => product.id !== id
        );
        state.products = newProducts;
      } else {
        state.products[existingItemIndex].amount -= 1;
      }
      state.totalAmount -= 1;
      state.totalPrice = state.products
        .map((product) => product.price * product.amount)
        .reduce((ac, cv) => ac + cv, 0);
    },
    reset: () => initialState,
  },
});
export const cartAction = cartSlice.actions;
export default cartSlice;
