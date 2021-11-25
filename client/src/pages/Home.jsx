import Nav from "../components/Nav";
import { Container, Row, Col, Pagination, Spinner } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getAllProductsAction } from "../redux/product/product-action";
import { useSelector, useDispatch } from "react-redux";
import { productsLimit } from "../utils/utils";
import { messageAction } from "../redux/message-slice";
import { userAction } from "../redux/user-slice";
import { Redirect } from "react-router";
const Home = () => {
  //redux
  const dispatch = useDispatch();

  const { results } = useSelector((state) => state.productList);
  const { message } = useSelector((state) => state.message);
  const lastPages = results.maxPages > 3 ? 3 : results.maxPages;

  //state
  const [activePage, setActivePage] = useState(1);

  const [beginIndex, setBeginIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(!!lastPages ? lastPages : 1);

  const startIndex = (activePage - 1) * productsLimit;
  const endIndex = activePage * productsLimit;

  let items = [];

  // console.log(beginIndex, lastIndex, activePage);
  for (let number = beginIndex; number <= lastIndex; number++) {
    if (
      activePage === lastIndex &&
      lastIndex < results.maxPages &&
      !!results.maxPages
    ) {
      setLastIndex(lastIndex + 1);
      setBeginIndex(beginIndex + 1);
    } else if (
      activePage === beginIndex &&
      beginIndex > 1 &&
      !!results.maxPages
    ) {
      setLastIndex(lastIndex - 1);
      setBeginIndex(beginIndex - 1);
    }

    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  let products = [];
  if (!!results.results) products = results.results.slice(startIndex, endIndex);
  useEffect(() => {
    dispatch(messageAction.reset());
    dispatch(getAllProductsAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userAction.reset());
    const token = localStorage.getItem("x-auth-token")
      ? localStorage.getItem("x-auth-token")
      : sessionStorage.getItem("x-auth-token");
    if (token) {
      dispatch(userAction.authenticate({ token, isAuthenticated: true }));
    }
  }, []);

  const renderComponents =
    message === "Loading" ? (
      <>
        <Spinner className="d-flex mx-auto" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    ) : (
      <Row className="gx-1 gy-5">
        {products.map((product, i) => {
          return (
            <Col key={i}>
              <ItemCard
                name={product.name}
                price={product.price}
                stock={product.stock}
                path={product.path}
                id={product._id}
                storeName={product.storeName}
                storeId={product.storeId}
              />
            </Col>
          );
        })}
      </Row>
    );
  return (
    <Fragment>
      <Nav />
      <Container style={{ marginTop: "150px" }}>
        {renderComponents}
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                activePage > 1 && setActivePage((prev) => prev - 1);
              }}
            />

            {items}

            <Pagination.Next
              onClick={() => {
                activePage < results.maxPages &&
                  setActivePage((prev) => prev + 1);
              }}
            />
          </Pagination>
        </div>
      </Container>
    </Fragment>
  );
};

export default Home;
