import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Link, Grid, Typography } from '@mui/material';


const SignUpForm  = (onSignUp) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
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
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
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
        Sign in
      </Typography>

      <Grid container spacing={2}> 
      
        <Grid item xs={12} sm={6}> 
          <TextField
            label="First name"
            variant="outlined"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Last name"
            variant="outlined"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone number"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={formData.agreeTerms} onChange={handleChange} name="agreeTerms" />}
            label={<React.Fragment>I agree with the <Link href="#">terms and conditions</Link>.</React.Fragment>}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>

  );
};

export default SignUpForm;
