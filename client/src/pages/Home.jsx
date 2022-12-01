import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logger from "use-reducer-logger";
import axios from "axios";
import { useReducer } from "react";

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
        dispath({ type: "FETCH_FAIL", payload: error.message });
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
          <div>Loading...</div>
        ) : err ? (
          <div>{err}</div>
        ) : (
          <div className="products">
            {products.map((product) => (
              <div key={product.slug} className="product">
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p>
                    <strong>{product.price}</strong>
                  </p>
                  <button>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
