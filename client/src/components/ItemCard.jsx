import React from "react";

import { Card, Button } from "react-bootstrap";
import classes from "./ItemCard.module.css";
import { formatter } from "../utils/utils";
import { useDispatch } from "react-redux";
import { cartAction } from "../redux/cart/cart-slice";
const ItemCard = (props) => {
  const dispatch = useDispatch();
  // dispatch(cartAction.reset());
  const addToCartHandler = () => {
    const product = {
      id: props.id,
      name: props.name,
      price: props.price,
      storeName: props.storeName,
      path: props.path,
    };
    dispatch(cartAction.addProductToCart({ product }));
  };
  return (
    <Card style={{ width: "250px", overflow: "hidden" }}>
      <Card.Img variant="top" src={props.path} className={classes.img} />
      <Card.Body>
        <Card.Title
          style={{ fontSize: "15px" }}
          className={classes["overflow-text"]}
        >
          {props.name}
        </Card.Title>
        <Card.Text style={{ fontWeight: "bold", color: "orangered" }}>
          {formatter.format(props.price)}
        </Card.Text>
        <Card.Text
          style={{ fontSize: "14px", fontWeight: "400", color: "gray" }}
        >
          {props.storeName}
        </Card.Text>
        <Button variant="outline-secondary" onClick={addToCartHandler}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
