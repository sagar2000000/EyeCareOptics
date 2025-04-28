import React, { useContext, useState } from 'react';
import './Header.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'; // adjust the path if needed

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartData } = useContext(StoreContext);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isCartNotEmpty = Object.values(cartData).some(quantity => quantity > 0);

  return (
    <div className='header-container'>
      <div className="logo-container">
        <img src={assets.logomount} alt="Logo" />
      </div>

      <div className="hamburger-icon" onClick={toggleSidebar}>
        <img src={assets.hamburger} alt="menu" />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="close-icon" onClick={toggleSidebar}>
          <img src={assets.cross} alt="Close" />
        </div>
        <ul className='sidebar-items'>
          <li onClick={toggleSidebar}>
            <NavLink to="/" activeClassName="active">Home</NavLink>
          </li>
          <li onClick={toggleSidebar}>
            <NavLink to="/sunglasses" activeClassName="active">Sunglasses</NavLink>
          </li>
          <li onClick={toggleSidebar}>
            <NavLink to="/eyeglasses" activeClassName="active">Eyeglasses</NavLink>
          </li>
          <li onClick={toggleSidebar}>
            <NavLink to="/contact-lens" activeClassName="active">Contact Lens</NavLink>
          </li>
        </ul>
      </div>

      <ul className='navbar-items'>
        <li>
          <NavLink to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/sunglasses" activeClassName="active">Sunglasses</NavLink>
        </li>
        <li>
          <NavLink to="/eyeglasses" activeClassName="active">Eyeglasses</NavLink>
        </li>
        <li>
          <NavLink to="/contact-lens" activeClassName="active">Contact Lens</NavLink>
        </li>
      </ul>

      <div className='user-container'>
        <div className="cart-wrapper">
          <NavLink to="/cart" activeClassName="active">
            <img src={assets.cart_icon} alt="cart" className="icon" />
            {isCartNotEmpty && <span className="cart-notification-dot"></span>}
          </NavLink>
        </div>

        <NavLink to="/account" activeClassName="active">
          <img src={assets.user} alt="user" className="icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
