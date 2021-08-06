import React from "react";
import { Container } from "react-bootstrap";
import CartCard from "./components/CartCard";
import SummaryCard from "./components/SummaryCard";
import { useSelector } from "react-redux";
const HasCart = () => {
  const results = useSelector((state) => state.cart);

  return (
    <Container style={{ marginTop: "100px" }}>
      {results.products.map((product) => (
        <CartCard
          amount={product.amount}
          id={product.id}
          path={product.path}
          price={product.price}
          storeName={product.storeName}
          name={product.name}
        />
      ))}

      <SummaryCard />
    </Container>
  );
};

export default HasCart;
