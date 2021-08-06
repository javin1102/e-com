import React from "react";
import classes from "./SummaryCard.module.css";
const SummaryCard = () => {
  return (
    <div className={classes.card}>
      <h5>Cart Summary</h5>
      <ul>
        <li>
          <span className={classes.product}>Vivo V3</span>
          <span className={classes.amount}>1 item(s)</span>
          <span className={classes.p}>IDR 4,000,000</span>
        </li>
        <li>
          <span className={classes.product}>Keyboard logitech</span>
          <span className={classes.amount}>3 item(s)</span>
          <span className={classes.p}>IDR 4,000,000</span>
        </li>
      </ul>
      <div className={classes.line}></div>
      <div className={classes["total-price"]}>
        <span>Total Price</span>
        <span className={classes.price}>IDR 8,000,000</span>
      </div>
    </div>
  );
};

export default SummaryCard;
