import Nav from "../components/Nav";
import { Container, Row, Col } from "react-bootstrap";
import { Fragment } from "react";
import ItemCard from "../components/ItemCard";
const Home = () => {
  return (
    <Fragment>
      <Nav />
      <Container className="mt-5">
        <Row className="gx-1 gy-5">
          <Col>
            <ItemCard />
          </Col>
          <Col>
            <ItemCard />
          </Col>
          <Col>
            <ItemCard />
          </Col>
          <Col>
            <ItemCard />
          </Col>
          <Col>
            <ItemCard />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
