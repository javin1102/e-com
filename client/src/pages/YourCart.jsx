import React from "react";
import Nav from "../components/Nav";
import NoCart from "../components/Cart/NoCart";
import HasCart from "../components/Cart/HasCart";
const YourCart = (props) => {
  return (
    <div>
      <Nav searchBar={props.searchBar} />
      <HasCart />
    </div>
  );
};

export default YourCart;
