import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { StoreContext } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Proceed.css";
import { Link } from "react-router-dom";
import axios from "axios";
import esewaLogo from "../../assets/esewa.png";
import codLogo from "../../assets/cod.png";

const Proceed = () => {
  const { getTotalAmount, cartData, userEmail, url, setCartData } = useContext(StoreContext);
  const totalAmount = getTotalAmount();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("eSewa");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^9\d{9}$/.test(phone)) {
      toast.error("Phone number must start with 9 and be exactly 10 digits.");
      return;
    }

    setIsLoading(true);
    const orderId = uuidv4();

    const items = Object.fromEntries(
      Object.entries(cartData).map(([productId, quantity]) => [productId, quantity])
    );

    const orderData = {
      order_id: orderId,
      fullname: name,
      phone,
      items,
      amount: totalAmount + 100,
      region,
      location,
      orderedBy: userEmail,
      paymentMethod,
    };

    try {
      if (paymentMethod === "eSewa") {
        const response = await axios.post(`${url}/esewa/payment-initiate`, orderData);
        if (response.status === 200) {
          toast.success("Redirecting to eSewa payment...");
          window.location.href = response.data.url;
        }
      } else if (paymentMethod === "COD") {
        const response = await axios.post(`${url}/cod/proceed-order`, orderData);
        if (response.status === 200) {
          toast.success("Order placed successfully!");
          window.location.href = "http://localhost:5173/cod-success";
        }
      }
    } catch (error) {
      toast.error("Error processing order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="proceed-container">
      <ToastContainer />
      <div className="delivery-details">
        <h2>Delivery Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="input-field"
            pattern="9\d{9}"
            title="Phone number must start with 9 and be 10 digits long"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            className="select-field"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          >
            <option value="">Select Region</option>
            <option value="Inside Valley">Inside Valley</option>
            <option value="Outside Valley">Outside Valley</option>
          </select>
          <input
            type="text"
            placeholder="Location e.g., district, street, tole"
            className="input-field"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="payment-methods">
            <h3>Payment</h3>
            <label>
              <input
                type="radio"
                name="payment"
                value="eSewa"
                checked={paymentMethod === "eSewa"}
                onChange={() => setPaymentMethod("eSewa")}
              />
              <img src={esewaLogo} alt="eSewa" className="payment-icon" />
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <img src={codLogo} alt="Cash on Delivery" className="payment-icon" />
            </label>
          </div>
          <button type="submit" className="place-order-button" disabled={isLoading}>
            {isLoading ? "Processing..." : "Place order"}
          </button>
        </form>
        <Link to="/cart">
          <button className="change-cart-button">← Change Cart</button>
        </Link>
      </div>
      <div className="summary">
        <h2>Summary</h2>
        <p>
          Sub Total <span>Rs. {totalAmount}</span>
        </p>
        <p>
          Delivery <span>Rs. 100</span>
        </p>
        <p className="total">
          Total <span>Rs. {totalAmount + 100}</span>
        </p>
      </div>
    </div>
  );
};

export default Proceed;
