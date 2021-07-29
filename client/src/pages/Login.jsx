import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import logo from "../images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/login-action";
const Login = () => {
  //set states
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  //REDUX
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.message);
  const { isAuthenticated } = useSelector((state) => state.user);

  //FORM SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (email.length === 0 || password.length === 0) return;
    dispatch(loginUser({ email, password }, rememberMe));
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {isAuthenticated && <Redirect to="/" />}
      <img
        src={logo}
        alt="images"
        style={{ width: "15%" }}
        className="align-self-center"
      />
      <h2 className="align-self-center mt-2">INCOMING</h2>
      {(status === 400 || status === 500) && (
        <Alert variant="danger">{message}</Alert>
      )}
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
            isInvalid={validated && email.length === 0}
          />
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
            isInvalid={validated && password.length === 0}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Remember me"
            onChange={(e) => setRememberMe(e.currentTarget.checked)}
          />
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
