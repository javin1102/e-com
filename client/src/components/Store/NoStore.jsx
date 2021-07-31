import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import cart from "../../images/cart.svg";
import { registerStoreAction } from "../../redux/store/store-action";
import { useDispatch, useSelector } from "react-redux";

const NoStore = () => {
  //SET STATE
  const [validated, setValidated] = useState(false);
  const [storeName, setStoreName] = useState("");

  //REDUX
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (storeName.length === 0) return;
    dispatch(registerStoreAction({ name: storeName }, token));
  };
  return (
    <Container className="d-flex flex-column mt-5">
      <img
        src={cart}
        alt="cart"
        style={{ width: "100px", margin: "10px auto" }}
      />
      <h4 style={{ textAlign: "center" }} className="mb-4">
        You have not register your store!
      </h4>
      <Form noValidate onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <h6>Your Store: </h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Store name"
            isInvalid={validated && storeName.length === 0}
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Store name field is required
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2 d-md-flex">
          <Button variant="dark" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NoStore;
