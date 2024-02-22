import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';


const LogInForm  = (onLogIn) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
        email: '',
        password: '',
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
        <Typography 
            variant="h5" 
            sx={{ 
            color: 'white', 
            fontWeight: 'bold', 
            mt: 2 
            }}
        >
            Log in
        </Typography>

        <TextField
        label="Email address"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: 'white' } }}
        inputProps={{ style: { color: 'white' } }}
        />
        
        <TextField
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: 'white' } }}
        inputProps={{ style: { color: 'white' } }}
        />
        
        <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ 
                mt: 2 
            }}
            >
            Submit
        </Button>
    </form>
  );
};

export default LogInForm;