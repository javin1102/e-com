import Nav from "../components/Nav";
import { Container, Row, Col } from "react-bootstrap";
import { Fragment, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { getAllProductsAction } from "../redux/product/product-action";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const { storeProducts } = useSelector((state) => state.productList);
  console.log(storeProducts);

  return (
    <Fragment>
      <Nav />
      <Container className="mt-5">
        <Row className="gx-1 gy-5">
          {storeProducts.map((product, i) => {
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
      </Container>
    </Fragment>
  );
};

export default Home;
