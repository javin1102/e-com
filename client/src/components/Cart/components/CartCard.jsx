import React from "react";
import { Card, Button } from "react-bootstrap";
import logo from "../../../images/logo.svg";
import classes from "./CartCard.module.css";
const CartCard = () => {
  return (
    <div className={classes.card}>
      <img src={logo} alt="ProductImage" className={classes.img} />
      <div className={classes.desc}>
        <h5>Product name</h5>
        <p>Store name</p>
        <h4>IDR 4,000,000</h4>
      </div>
      <div className={classes.amount}>
        <Button variant="outline-secondary" className="mb-2">
          +
        </Button>
        <span>4</span>
        <Button variant="outline-danger" className="mt-2">
          -
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
