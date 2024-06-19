
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import './SignIn.css';
import Cookies from 'js-cookie';


const SignIn = () => {
  const navigate = useNavigate();
  // const { setUserToken } = useContext(UserContext); 
  const { fetchUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:3000/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('bukachuda', response)
      console.log('Server response:', result);
      if (result.message === "Logined Successfully") {
        // setUserToken(result.data.token); 
        Cookies.set('token', result.data.token);
        fetchUserData();
        // console.log("Token is -: ", result.data.token)
        navigate('/user');
      } else if (result.message.startsWith("User not found with email")) {
        alert("User not found. Please sign up first");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMadLOG = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:3000/user/loggingout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      const result = await response.json();
      console.log('bukachuda', response)
      console.log('Server response:', result);
      if (result.message === "Logined Successfully") {
        navigate('/login');
      } else if (result.message.startsWith("User not found with email")) {
        alert("User not found. Please sign up first");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Sign in</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;


