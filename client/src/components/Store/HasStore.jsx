import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StoreCard from "./components/StoreCard";
import { NavLink } from "react-router-dom";
import classes from "./HasStore.module.css";
const HasStore = () => {
  return (
    <Container className="mt-5">
      <Row className="gx-1 gy-5">
        <NavLink
          to="/yourStore/addProduct"
          className={classes["nav-a-1"]}
          style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "500" }}
        >
          Add Product +
        </NavLink>
        <Col>
          <StoreCard />
        </Col>
        <Col>
          <StoreCard />
        </Col>
        <Col>
          <StoreCard />
        </Col>
        <Col>
          <StoreCard />
        </Col>
        <Col>
          <StoreCard />
        </Col>
      </Row>
    </Container>
  );
};

export default HasStore;
