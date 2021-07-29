import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import logo from "../images/logo.svg";
import { NavLink, Redirect } from "react-router-dom";
import { registerUser } from "../redux/register-action";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  //set states
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //REDUX
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.message);
  const { isAuthenticated } = useState((state) => state.user);

  //Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    //Register Rules
    if (
      name.length > 0 &&
      validateEmail(email) &&
      password.length >= 8 &&
      confirmPassword === password
    ) {
      dispatch(
        registerUser({
          name,
          email,
          password,
        })
      );
    }
  };

  function validateEmail(e) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(e).toLowerCase());
  }

  return (
    <Container
      className="d-flex flex-column justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {/* if register success then redirect to homepage */}
      {isAuthenticated && <Redirect to="/" />}

      <img
        src={logo}
        alt="images"
        style={{ width: "10%" }}
        className="align-self-center"
      />
      <h2 className="align-self-center mt-2">INCOMING</h2>

      {/* show alert if register failed */}
      {(status === 400 || status === 500) && (
        <Alert variant="danger">{message}</Alert>
      )}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>
            <h6>Username</h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
            isInvalid={validated && name.length === 0}
          />
          <Form.Control.Feedback type="invalid">
            Invalid username
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <h6>Email address</h6>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
            isInvalid={validated && !validateEmail(email)}
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
            isInvalid={validated && password.length < 8}
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
          />
          <Form.Control.Feedback type="invalid">
            Password must be 8 characters or more
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>
            <h6>Confirm Password</h6>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value);
            }}
            isInvalid={
              validated &&
              (confirmPassword.length === 0 || confirmPassword !== password)
            }
            value={confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            Password not match
          </Form.Control.Feedback>
        </Form.Group>

        <div className="clearfix">
          <NavLink to="/login" className="link-dark" style={{ float: "right" }}>
            Already have account?
          </NavLink>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-5">
          <Button variant="dark" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
