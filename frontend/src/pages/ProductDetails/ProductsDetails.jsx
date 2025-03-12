import React, { useState, useContext } from "react";
import "./ProductsDetails.css";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const ProductsDetails = () => {
  const { addToCart, cartData, product_list, url, token } = useContext(StoreContext);
  const { name } = useParams();
  const product = product_list.find((p) => p.name === name);

  if (!product) return <p>Product not found.</p>;

  const [displayImage, setDisplayImage] = useState(url + "/images/" + product.image);

  const handleAddToCart = (_id) => {
    if (!token) {
      toast.error("Please login before adding to cart", { position: "top-right" });
      return;
    }

    const currentCount = cartData[_id] || 0;
    if (currentCount < product.stock) {
      addToCart(_id);
      toast.success(`${product.name} added to cart!`, { position: "top-right" });
    } else {
      toast.error("Cannot add more than available stock", { position: "top-right" });
    }
  };

  return (
    <div className="product-details">
      <ToastContainer autoClose={2000} />

      <div className="image-container">
        <div className="display-image">
          <img src={displayImage} alt={product.name} />
          <p id="stock" className="stock-large">
            {product.stock > 0 ? `In stock: ${product.stock} available` : "Out of stock"}
          </p>
        </div>
        {product.imageB && product.category !== "lens" && (
          <div className="extra-image-container">
            <div className="extra-image" onClick={() => setDisplayImage(url + "/images/" + product.image)}>
              <img src={url + "/images/" + product.image} alt={product.name} />
            </div>
            <div className="extra-image" onClick={() => setDisplayImage(url + "/images/" + product.imageB)}>
              <img src={url + "/images/" + product.imageB} alt={product.name} />
            </div>
          </div>
        )}
      </div>
      <div className="detail-container">
        <div className="detail">
          <p>MOUNTOPTICS</p>
          <h2>{product.name}</h2>
          <p id="price">Rs {product.price}</p>
          <h2>Technical Information:</h2>
          {product.category === "lens" ? (
            <>
              <p>Base Curve: {product.BaseCurve}</p>
              <p>Diameter: {product.Diameter}</p>
              <p>Water Content: {product.WaterContent}</p>
              <p>Packaging: {product.Packaging}</p>
            </>
          ) : (
            <>
              <p>Frame Material: {product.FrameMaterial}</p>
              <p>Temple Material: {product.TempleMaterial}</p>
              <p>Frame Shape: {product.FrameShape}</p>
              <p>Frame Size: {product.FrameSize}</p>
              <p>Frame Color: {product.Framecolor}</p>
            </>
          )}
        </div>
        <div className="cart-div">
          {product.stock > 0 ? (
            <button
              id="cart-btn"
              onClick={() => handleAddToCart(product._id)}
              disabled={(cartData[product._id] || 0) >= product.stock}
            >
              {(cartData[product._id] || 0) >= product.stock ? "STOCK LIMIT REACHED" : "ADD TO CART"}
            </button>
          ) : (
            <button id="cart-btn" disabled style={{ backgroundColor: "grey", cursor: "not-allowed" }}>
              OUT OF STOCK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
