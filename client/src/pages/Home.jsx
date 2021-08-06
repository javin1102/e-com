import Nav from "../components/Nav";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getAllProductsAction } from "../redux/product/product-action";
import { useSelector, useDispatch } from "react-redux";
import { productsLimit } from "../utils/utils";

const Home = () => {
  //state
  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage - 1) * productsLimit;
  const endIndex = activePage * productsLimit;

  //redux
  const dispatch = useDispatch();

  const { results } = useSelector((state) => state.productList);

  let items = [];
  for (let number = 1; number <= results.maxPages; number++) {
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

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);
  let products = [];
  if (!!results.results) products = results.results.slice(startIndex, endIndex);

  return (
    <Fragment>
      <Nav />
      <Container className="mt-5">
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
