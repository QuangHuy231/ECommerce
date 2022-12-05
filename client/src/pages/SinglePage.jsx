import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, err: action.payload, loading: false };
    default:
      return state;
  }
};
const SinglePage = () => {
  const params = useParams();
  const { slug } = params;
  const [{ loading, product, err }, dispath] = useReducer(reducer, {
    product: [],
    loading: false,
    err: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      dispath({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/product/${slug}`);
        dispath({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispath({ type: "FETCH_FAIL", payload: error.message });
      }

      // setProducts(result.data);
    };
    fetchProducts();
  }, [slug]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : err ? (
        <div>{err}</div>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                src={product.image}
                alt={product.name}
                className="img-large"
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
