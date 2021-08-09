import React, { useState } from "react";
import logo from "../images/logo.svg";
import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../redux/user-slice";
import { messageAction } from "../redux/message-slice";
import { productListAction } from "../redux/product/productlist-slice";
import { cartAction } from "../redux/cart/cart-slice";
const Nav = (props) => {
  const [searchKey, setSearchKey] = useState("");

  const { isAuthenticated } = useSelector((state) => state.user);
  const results = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKey.trim().length === 0) return;
    history.push(`/products?search=${searchKey}`);
  };
  const renderComponents = isAuthenticated ? (
    <>
      <NavLink className={classes["nav-a-1"]} to="/">
        Home
      </NavLink>

      <NavLink className={classes["nav-a-1"] + " ms-4"} to="/yourCart">
        Your cart
        <span className={classes["cart-amount"] + " ms-1"}>
          {results.totalAmount}
        </span>
      </NavLink>
      <NavLink className={classes["nav-a-1"] + " ms-4"} to="/yourStore">
        Your Store
      </NavLink>
      <NavLink
        onClick={() => {
          sessionStorage.removeItem("x-auth-token");
          localStorage.removeItem("x-auth-token");
          dispatch(userAction.logoutUser());
          dispatch(messageAction.reset());
          dispatch(cartAction.reset());
          dispatch(productListAction.reset());
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
          />
          INCOMING
        </NavLink>

        <Form className="d-flex my-3" onSubmit={searchHandler}>
          {props.searchBar !== false && (
            <>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
              />
              <Button variant="outline-secondary mx-2" type="submit">
                Search
              </Button>
            </>
          )}
        </Form>
        <div className="ms-auto my-2">{renderComponents}</div>
      </Container>
    </Navbar>
  );
};

export default Nav;
