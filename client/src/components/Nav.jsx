import React from "react";
import logo from "../images/logo.svg";
import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../redux/user-slice";
const Nav = (props) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const renderComponents = isAuthenticated ? (
    <>
      <NavLink className={classes["nav-a-1"]} to="/yourStore">
        Your Store
      </NavLink>
      <NavLink className={classes["nav-a-1"] + " ms-4"} to="/yourCart">
        Your cart
        <span className={classes["cart-amount"] + " ms-1"}>4</span>
      </NavLink>
      <NavLink
        onClick={() => {
          sessionStorage.removeItem("x-auth-token");
          localStorage.removeItem("x-auth-token");
          dispatch(userAction.logoutUser());
        }}
        className={classes["nav-a-1"] + " ms-3"}
        to="/login"
      >
        Logout
      </NavLink>
    </>
  ) : (
    <NavLink className={classes["nav-a-1"]} to="/login">
      Login
    </NavLink>
  );

  return (
    <Navbar bg="light" variant="light" fixed="top">
      <Container>
        <NavLink className="navbar-brand " to="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          INCOMING
        </NavLink>

        <Form className="d-flex my-3">
          {props.searchBar !== false && (
            <>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-secondary mx-2">Search</Button>
            </>
          )}
        </Form>
        <div className="ms-auto my-2">{renderComponents}</div>
      </Container>
    </Navbar>
  );
};

export default Nav;
