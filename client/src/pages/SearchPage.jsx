import Nav from "../components/Nav";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { Fragment, useEffect, useState, useMemo } from "react";
import ItemCard from "../components/ItemCard";
import { useDispatch } from "react-redux";
import { productListAction } from "../redux/product/productlist-slice";
import { getSearchProductsAction } from "../redux/product/product-action";
import { useSelector } from "react-redux";
import { productsLimit } from "../utils/utils";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location]);

  //reedux
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.productList);
  const lastPages = searchResults.maxPages > 3 ? 3 : searchResults.maxPages;
  //reset and get
  useEffect(() => {
    dispatch(productListAction.resetSearchResults());
    dispatch(getSearchProductsAction(query.get("search")));
  }, [dispatch, query]);
  //state
  const [activePage, setActivePage] = useState(1);

  const [beginIndex, setBeginIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(lastPages);

  const startIndex = (activePage - 1) * productsLimit;
  const endIndex = activePage * productsLimit;

  let items = [];
  for (let number = beginIndex; number <= lastIndex; number++) {
    if (activePage === lastIndex && lastIndex < searchResults.maxPages) {
      setLastIndex(lastIndex + 1);
      setBeginIndex(beginIndex + 1);
    } else if (activePage === beginIndex && beginIndex > 1) {
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
  if (!!searchResults.results)
    products = searchResults.results.slice(startIndex, endIndex);
  const renderElement =
    products.length === 0 ? (
      <h1>No Product</h1>
    ) : (
      <>
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
                activePage < searchResults.maxPages &&
                  setActivePage((prev) => prev + 1);
              }}
            />
          </Pagination>
        </div>
      </>
    );
  return (
    <Fragment>
      <Nav searchKey={query.get("search")} />
      <Container style={{ marginTop: "150px" }}>{renderElement}</Container>
    </Fragment>
  );
};

export default SearchPage;
