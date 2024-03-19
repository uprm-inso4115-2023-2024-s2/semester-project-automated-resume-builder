import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './Authentication.css';

const SignUpForm = () => {
  const { setGlobalUser } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if password and confirm password match
      if (formData.password !== formData.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
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
        // Handle successful signup
        console.log('Signup successful:', data);
      } else {
        // Handle failed signup
        console.error('Signup failed:', response.status);
      }
    } catch (error) {
      console.error('Error occurred while signing up:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">Sign Up</h1>
        <div className="input-field-container">
          <TextField
            label="Enter your email address"
            variant="outlined"
            name="email"
            margin="none"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <TextField
            label="Enter your password"
            variant="outlined"
            name="password"
            margin="none"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
            className="input-field"
          />
          <TextField
            label="Confirm your password"
            variant="outlined"
            name="confirmPassword"
            margin="none"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
            className="input-field"
          />
        </div>
        <div className="alternative-container">
          Already have an account?
          <Link to="/login">
            <button className="alternative-button">
              Log In
            </button>
          </Link>
        </div>
        <button className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
