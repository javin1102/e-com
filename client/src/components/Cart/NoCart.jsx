import React from "react";
import cart from "../../images/cart.svg";
import { Container } from "react-bootstrap";
const NoCart = () => {
  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <img
        src={cart}
        alt="cart"
        style={{ width: "100px", marginTop: "150px" }}
      />
      <h4 style={{ textAlign: "center" }} className="mt-4">
        Cart is Empty!
      </h4>
    </Container>
  );
};

export default NoCart;
