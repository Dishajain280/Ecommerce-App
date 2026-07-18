import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../components/shopContext/shopContext.jsx";
import { productsData } from "../../assets/data.jsx";
import { useParams } from "react-router-dom";
import "./productDetails.css";

const ProductDetails = () => {
  const { addToCart } = useContext(ShopContext);

  const { id } = useParams();
  const productId = parseInt(id, 10);
  const product = productsData.find((product) => {
    return product.id === productId;
  });

  if (!product) {
    return <div className="product-detail">Product not found.</div>;
  }

  return (
    <div>
      <div className="product-detail">
        <div className="details-left">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-right">
          <h3>{product.name}</h3>
          <p className="p-price">${product.price}</p>
          <p className="p-description">{product.description}</p>
          <button onClick={() => addToCart(product, productId)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
