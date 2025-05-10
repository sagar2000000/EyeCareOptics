import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Users from './pages/Users/Users';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import VisualReport from './pages/Sales/VisualReport';
import RevenueReport from './pages/Sales/RevenueReport';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const url = "http://localhost:4000";
  
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        
        <div className="main-content">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/visual-report" element={<VisualReport url={url} />} />
            <Route path="/revenue-report" element={<RevenueReport url={url} />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users url={url} />} />
          </Routes>
          
        </div>
      </div>
    </div>
  );
};

export default App;
