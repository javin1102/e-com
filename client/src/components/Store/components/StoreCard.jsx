import React, { useState } from "react";

import { Card, Button } from "react-bootstrap";
import logo from "../../../images/logo.svg";
import classes from "./StoreCard.module.css";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "IDR",
});
const StoreCard = (props) => {
  return (
    <Card style={{ width: "250px", overflow: "hidden" }}>
      <Card.Img src={props.path} variant="top" className={classes.img} />

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
          Stock : {props.stock}
        </Card.Text>
        <Button variant="outline-secondary">Update Product</Button>
        <Button variant="outline-danger" className="mt-3">
          Delete Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StoreCard;
