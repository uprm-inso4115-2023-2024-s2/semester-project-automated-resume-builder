import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './Authentication.css';

const LogInForm = (onLogIn) => {
  const { setGlobalUser } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save token to localStorage
        localStorage.setItem('userToken', data.token);
        // Set global user state
        setGlobalUser({
          id: data.user.user_id,
          name: data.user.name,
          middle_initial: data.user.middle_initial,
          frst_lst_name: data.user.frst_lst_name,
          scnd_lst_name: data.user.scnd_lst_name,
          phone_num: data.user.phone_number,
          profile: data.user.profile,
          usr_name: data.user.name,
          email: data.user.email,
          password: '',
        });
        // Handle successful login, e.g., redirect to dashboard
        console.log('Login successful:', data);
      } else {
        // Handle failed login
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    }
  };

  return (
    <div className="container"> {/* Use the container class for styling */}
      <form onSubmit={handleSubmit} className="form-container"> {/* Use form-container class */}
        <h1 className="form-title">Login</h1> {/* Use title class for styling */}
        <div className="input-field-container">
          <TextField
            label="Enter your email address"
            variant="outlined"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <TextField
            label="Enter your password"
            variant="outlined"
            name="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="alternative-container">
          Don't have an account?
          <Link to="/signup">
            <button className="alternative-button">
              Sign Up
            </button>
          </Link>
        </div>
        <button className="submit-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
