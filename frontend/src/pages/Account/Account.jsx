import React, { useState, useContext } from 'react';
import './Account.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Link } from 'react-router-dom';

const Account = () => {
  const [currState, setCurrState] = useState('Login');
  const { token, setToken,setUserEmail,url,userEmail} = useContext(StoreContext);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      if (name === "email") {
        setUserEmail(value);
        localStorage.setItem("userEmail", value); 
      }
      return updatedData;
    });
  };

  const onLogin = async (event) => {
    event.preventDefault();
  
    // Client-side validation
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|in)$/;
    const passwordValid = data.password.length >= 5;
  
    if (currState === 'Register') {
      if (!nameRegex.test(data.name)) {
        toast.error("Name should only contain alphabets and be at least 2 characters.");
        return;
      }
    }
  
    if (!emailRegex.test(data.email)) {
      toast.error("Enter a valid email (e.g., example@gmail.com, ending with .com, .org, etc.)");
      return;
    }
  
    if (!passwordValid) {
      toast.error("Password must be at least 5 characters long.");
      return;
    }
  
    let newUrl = url;
    newUrl += currState === 'Login' ? '/user/login' : '/user/register';
  
    try {
      const response = await axios.post(newUrl, data);
      console.log(response.data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(currState === 'Login' ? 'Login Successful' : 'Registration Successful');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('Error during login/register:', error);
      toast.error('An error occurred. Please try again!');
    }
  };

  const toggleForm = () => {
    setCurrState(currState === 'Login' ? 'Register' : 'Login');
  };

  const onLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  return (
    <div className="account-div">
      <div className="profile-container">
        {token ? (
          <>
            <center className="profile-header">My Account</center>
            <center className="profile-welcome">Welcome</center>
            <ul className="profile-options">
              <Link to ="/orders" id='Orders'><li>Orders</li></Link>
              <li onClick={onLogout}>Logout</li>
            </ul>
          </>
        ) : (
          <div className="login-container">
            <form onSubmit={onLogin}>
              {currState === 'Register' && (
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Fullname"
                  className="input-field"
                  value={data.name}
                  onChange={onChangeHandler}
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input-field"
                value={data.email}
                onChange={onChangeHandler}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="input-field"
                value={data.password}
                onChange={onChangeHandler}
              />

              <button type="submit" className="submit-button">
                {currState === 'Login' ? 'Login' : 'Register'}
              </button>
            </form>

            <p className="toggle-text" onClick={toggleForm}>
              {currState === 'Login'
                ? "Don't have an account? Click here to register"
                : "Already have an account? Click here to login"}
            </p>
          </div>
        )}
      </div>

      <ToastContainer /> {/* Make sure this is inside the component */}
    </div>
  );
};

export default Account;
