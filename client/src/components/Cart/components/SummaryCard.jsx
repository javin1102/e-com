import React from "react";
import classes from "./SummaryCard.module.css";
import { useSelector } from "react-redux";
import { formatter } from "../../../utils/utils";
const SummaryCard = () => {
  const results = useSelector((state) => state.cart);
  return (
    <div className={classes.card}>
      <h5>Cart Summary</h5>
      <ul>
        {results.products.map((product) => (
          <li>
            <span className={classes.product}>{product.name}</span>
            <span className={classes.amount}>{product.amount} item(s)</span>
            <span className={classes.p}>
              {formatter.format(product.price * product.amount)}
            </span>
          </li>
        ))}
      </ul>
      <div className={classes.line}></div>
      <div className={classes["total-price"]}>
        <span>Total Price</span>
        <span className={classes.price}>
          {formatter.format(results.totalPrice)}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
