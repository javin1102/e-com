import React from "react";
import { Button } from "react-bootstrap";
import classes from "./CartCard.module.css";
import { formatter } from "../../../utils/utils";
import { cartAction } from "../../../redux/cart/cart-slice";
import { useDispatch } from "react-redux";
const CartCard = (props) => {
  const dispatch = useDispatch();
  const product = {
    id: props.id,
    name: props.name,
    price: props.price,
    storeName: props.storeName,
    path: props.path,
  };
  const addToCartHandler = () => {
    dispatch(cartAction.addProductToCart({ product }));
  };
  const removeFromCartHandler = () => {
    dispatch(cartAction.removeProductFromCart({ product }));
  };
  return (
    <div className={classes.card}>
      <img src={props.path} alt="ProductImage" className={classes.img} />
      <div className={classes.desc}>
        <h5 className={classes.name}>{props.name}</h5>
        <p
          style={{
            color: "rgba(0,0,0,.5)",
            lineHeight: "5px",
            fontSize: "13.5px",
            fontWeight: "500",
          }}
        >
          {props.storeName}
        </p>
        <h5>{formatter.format(props.price)}</h5>
      </div>
      <div className={classes.amount}>
        <Button
          variant="outline-secondary"
          className="mb-2"
          onClick={addToCartHandler}
        >
          +
        </Button>
        <span>{props.amount}</span>
        <Button
          variant="outline-danger"
          className="mt-2"
          onClick={removeFromCartHandler}
        >
          -
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
