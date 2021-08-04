import React from "react";

import { Card, Button } from "react-bootstrap";
import classes from "./StoreCard.module.css";
import { useHistory } from "react-router-dom";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "IDR",
});
const StoreCard = (props) => {
  const history = useHistory();
  const deleteHandler = () => {
    props.showModal(true);
    props.selectedIdHandler(props.id);
  };

  const updateHandler = () => {
    history.push(`/yourStore/updateProduct/${props.id}`);
  };

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
        <Button variant="outline-secondary" onClick={updateHandler}>
          Update Product
        </Button>
        <Button
          variant="outline-danger"
          className="mt-3"
          onClick={deleteHandler}
        >
          Delete Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StoreCard;
