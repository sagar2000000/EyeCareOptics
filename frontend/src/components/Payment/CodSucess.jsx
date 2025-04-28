import React from "react";
import "./Success.css";
import { useNavigate } from "react-router-dom";

const SuccessUI = ({ isSuccess = true }) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  if (!isSuccess) {
    return (
      <div className="container">
        <h1 className="error-title">Oops! Error verifying Order</h1>
        <p className="error-text">We’ll resolve it soon. Please try again later.</p>
        <button onClick={handleReturnHome} className="button">
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
        <h1 className="success-title">Order Successful</h1>
        <p className="success-text">Thank you for your purchase!</p>
        <button onClick={handleReturnHome} className="button">
          Return to Homepage
        </button>
      </main>
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

export default SuccessUI;
