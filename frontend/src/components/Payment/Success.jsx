import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import axios from "axios";
import "./Success.css";

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  const decoded = base64Decode(token);

  const verifyPaymentAndUpdateStatus = async () => {
    if (!decoded || !decoded.transaction_uuid) {
      console.error("Invalid token or missing transaction UUID");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/esewa/payment-status",
        { order_id: decoded.transaction_uuid }
      );

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  if (isLoading && !isSuccess) return <p className="loading">Loading...</p>;

  if (!isLoading && !isSuccess) {
    return (
      <div className="container">
        <h1 className="error-title">Oops! Error verifying payment</h1>
        <p className="error-text">We’ll resolve it soon. Please try again later.</p>
        <button onClick={() => navigate("/")} className="button">
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <MountainIcon className="icon" />
          <span className="sr-only">Acme Inc</span>
        </div>
      </header>
      <main className="main">
        <CircleCheckIcon className="check-icon" />
        <h1 className="success-title">Payment Successful</h1>
        <p className="success-text">Thank you for your purchase!</p>
        <button onClick={() => navigate("/")} className="button">
          Return to Homepage
        </button>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Acme Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

function CircleCheckIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="green"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MountainIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Success;
