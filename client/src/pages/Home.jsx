import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data";

const Home = () => {
  useEffect(() => {});
  return (
    <>
      <div>
        <h1>Feature Products</h1>
        <div className="products">
          {data.products.map((product) => (
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
      </div>
    </>
  );
};

export default Home;
