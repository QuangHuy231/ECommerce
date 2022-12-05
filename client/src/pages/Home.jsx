import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logger from "use-reducer-logger";
import axios from "axios";
import { useReducer } from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, err: action.payload, loading: false };
    default:
      return state;
  }
};

const Home = () => {
  const [{ loading, products, err }, dispath] = useReducer(logger(reducer), {
    products: [],
    loading: false,
    err: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      dispath({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispath({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispath({ type: "FETCH_FAIL", payload: getError(error) });
      }

      // setProducts(result.data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div>
        <h1>Feature Products</h1>
        {loading ? (
          <Loader />
        ) : err ? (
          <Error variant="danger">{err}</Error>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default Home;
