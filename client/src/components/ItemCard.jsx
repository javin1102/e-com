import React from "react";

import { Card, Button } from "react-bootstrap";
import logo from "../images/logo2.png";
import classes from "./ItemCard.module.css";
const ItemCard = () => {
  return (
    <Card style={{ width: "17rem" }}>
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title
          style={{ fontSize: "15px" }}
          className={classes["overflow-text"]}
        >
          THE LAST OF US
        </Card.Title>
        <Card.Text style={{ fontWeight: "bold", color: "orangered" }}>
          Rp50.000
        </Card.Text>
        <Card.Text
          style={{ fontSize: "14px", fontWeight: "400", color: "gray" }}
        >
          BS Store
        </Card.Text>
        <Button variant="outline-secondary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
