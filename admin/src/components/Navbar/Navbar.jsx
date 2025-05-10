import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import "./Navbar.css";
import { assets } from '../../assets/assets';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>
    </div>
  );
}

export default Navbar;
