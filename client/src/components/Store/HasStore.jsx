import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import StoreCard from "./components/StoreCard";
import { NavLink } from "react-router-dom";
import classes from "./HasStore.module.css";
import { getProductsAction } from "../../redux/store/store-action";
import { useDispatch, useSelector, connect } from "react-redux";
import StoreModal from "./components/StoreModal";

const HasStore = () => {
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { products } = user.store;
  const { message } = useSelector((state) => state.message);

  //stateHandler
  const showErrorHandler = (val) => setShowError(val);
  const showModalHandler = (val) => setShowModal(val);

  useEffect(() => {
    let isCancelled = false;
    const runAsync = async () => {
      try {
        dispatch(getProductsAction(user.token));
      } catch (e) {
        if (!isCancelled) {
          throw e;
        }
      }
    };
    runAsync();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, user.token]);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [showError]);

  return (
    <Container className="mt-5">
      {showError && <Alert variant="danger">{message}</Alert>}

      <StoreModal
        showModal={showModal}
        showError={showErrorHandler}
        showModalHandler={showModalHandler}
        selectedId={selectedId}
      />

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
                showModal={showModalHandler}
                selectedIdHandler={(id) => setSelectedId(id)}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default HasStore;
