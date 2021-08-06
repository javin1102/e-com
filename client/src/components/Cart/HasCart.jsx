import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import CartCard from "./components/CartCard";
import SummaryCard from "./components/SummaryCard";
const HasCart = () => {
  return (
    <Container style={{ marginTop: "100px" }}>
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
      <SummaryCard />
      {/* <Row className="my-5">
        <Col>2</Col>
      </Row>
      <Row className="my-5">
        <Col>2</Col>
      </Row> */}
    </Container>
  );
};

export default HasCart;
