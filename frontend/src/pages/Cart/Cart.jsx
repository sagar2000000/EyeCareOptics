import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { products } from "../../assets/assets";
import { Link } from 'react-router-dom';
import "./Cart.css";

const CartPage = () => {
  const { cartData, removeFromCart, getTotalAmount,product_list,url,} = useContext(StoreContext);
  const [removingItem, setRemovingItem] = useState(null); 

  const handleRemove = (_id) => {
    setRemovingItem(_id);
    setTimeout(() => {
      removeFromCart(_id); 
      setRemovingItem(null); 
    }, 300); 
  };

  // Ensure _id is handled properly
  const cartItems = Object.keys(cartData).filter((_id) => cartData[_id] > 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="cart-items">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((_id) => {
                // Ensure type consistency
                const product = product_list.find((prod) => String(prod._id) === String(_id));
                if (!product) return null;

                return (
                  <tr key={_id} className={removingItem === _id ? "fade-out" : ""}>
                    <td>
                      <img src={url+"/images/"+product.image} alt={product.name} />
                      {product.name}
                    </td>
                    <td>{product.price} Rs</td>
                    <td>{cartData[_id]}</td>
                    <td>
                      <button onClick={() => handleRemove(_id)}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Amount: {getTotalAmount()} Rs</p>
        <p>Delivery Fee: Rs{getTotalAmount() === 0 ? 0 : 100}</p>
        <p>Total Amount: Rs{getTotalAmount() > 0 ? getTotalAmount() + 100 : 0}</p>

        <Link to='/proceed-to-payment'><button disabled={getTotalAmount() === 0}>Proceed to Checkout</button></Link>
      </div>
    </div>
  );
};

export default CartPage;
