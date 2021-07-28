import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";
const Login = () => {
  //set states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Container
      className="d-flex flex-column justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <img
        src={logo}
        alt="images"
        style={{ width: "15%" }}
        className="align-self-center"
      />
      <h2 className="align-self-center mt-2">INCOMING</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <h6>Email address</h6>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
          />
          <Form.Control.Feedback type="invalid">
            Invalid email address
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <h6>Password</h6>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <div className="clearfix">
          <NavLink
            to="/register"
            className="link-dark"
            style={{ float: "right" }}
          >
            Don't have account?
          </NavLink>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-5">
          <Button variant="dark" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
