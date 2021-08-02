import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import StoreCard from "./components/StoreCard";
import { NavLink } from "react-router-dom";
import classes from "./HasStore.module.css";
import { getStoreProductsAction } from "../../redux/store/store-action";
import { useDispatch, useSelector } from "react-redux";
const HasStore = () => {
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.user.store);

  useEffect(() => {
    dispatch(getStoreProductsAction(user.token));
  }, [dispatch, user.token]);
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
        {products.map((product, i) => {
          return (
            <Col key={i}>
              <StoreCard
                id={product.id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                path={product.path}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default HasStore;
