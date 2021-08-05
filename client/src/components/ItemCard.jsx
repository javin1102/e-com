import React from "react";

import { Card, Button } from "react-bootstrap";
import logo from "../images/logo2.png";
import classes from "./ItemCard.module.css";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "IDR",
});
const ItemCard = (props) => {
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
        <Button variant="outline-secondary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
