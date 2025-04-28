import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "show" : ""}`}>
        <div className="sidebar-options">
          <NavLink to="/add" className="sidebar-option" onClick={() => setIsOpen(false)}>
            <img src={assets.add_icon} alt="Add Icon" />
            <p>Add Items</p>
          </NavLink>

          <NavLink to="/list" className="sidebar-option" onClick={() => setIsOpen(false)}>
            <img src={assets.order_icon} alt="List Icon" />
            <p>List Items</p>
          </NavLink>

          <NavLink to="/orders" className="sidebar-option" onClick={() => setIsOpen(false)}>
            <img src={assets.order_icon} alt="Orders Icon" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>

      {/* Toggle Button */}
      <button className={`sidebar-toggle ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}

export default Sidebar;
