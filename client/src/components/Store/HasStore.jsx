import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import StoreCard from "./components/StoreCard";
import { NavLink } from "react-router-dom";
import classes from "./HasStore.module.css";
import { getProductsAction } from "../../redux/store/store-action";
import { useDispatch, useSelector } from "react-redux";
import StoreModal from "./components/StoreModal";

const HasStore = () => {
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { message } = useSelector((state) => state.message);

  //stateHandler
  const showErrorHandler = (val) => setShowError(val);
  const showModalHandler = (val) => setShowModal(val);

  useEffect(() => {
    dispatch(getProductsAction(user.token));
  }, [dispatch, user.token]);

  const { products } = useSelector((state) => state.user.store);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [showError]);
  const renderComponents =
    message === "Loading" ? (
      <>
        <Spinner className="d-flex mx-auto" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    ) : (
      <>
        {!!products &&
          products.map((product, i) => {
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
      </>
    );
  return (
    <Container style={{ marginTop: "100px" }}>
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
        {renderComponents}
      </Row>
    </Container>
  );
};

export default HasStore;
