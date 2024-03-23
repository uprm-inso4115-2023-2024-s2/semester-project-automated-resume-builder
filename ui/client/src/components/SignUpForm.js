import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Link, Grid, Typography } from '@mui/material';



const SignUpForm  = (onSignUp) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let error = '';

    // Validation 

    switch (name) {
      case 'firstName':
        error = value.trim() === '' ? 'First name is required' : /\d/.test(value) ? 'First name should not contain numbers' : '';
        break;
      case 'lastName':
        error = value.trim() === '' ? 'Last name is required' : /\d/.test(value) ? 'Last name should not contain numbers' : '';
        break;
      case 'phone':
        error = value.trim() === '' ? 'Phone number is required' : /[a-zA-Z]/.test(value) ? 'Phone number should not contain letters' : value.length !== 10 ? 'Phone number should be exactly 10 digits' : '';
        break;
      case 'email':
        error = value.trim() === '' ? 'Email is required' : !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) ? 'Email is invalid' : '';
        break;
      case 'password':
        error = value.trim() === '' ? 'Password is required' : !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/.test(value) ? 'Password is invalid, please make sure it has at least: uppercase letters, lowercase letters and numbers' : '';
        break;
      case 'confirmPassword':
        error = value.trim() === '' ? 'Confirm password is required' : value !== formData.password ? 'Passwords do not match' : '';
        break;
      default:
        break;
    }

    setError({...error, [name]: error});

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    for (let key in formData) {
      let error = '';
      switch(key){
        case 'firstName':
          error = formData[key].trim() === '' ? 'First name is required' : /\d/.test(formData[key]) ? 'First name should not contain numbers' : '';
          break;
        case 'lastName':
          error = formData[key].trim() === '' ? 'Last name is required' : /\d/.test(formData[key]) ? 'Last name should not contain numbers' : '';
          break;
        case 'phone':
          error = formData[key].trim() === '' ? 'Phone number is required' : /[a-zA-Z]/.test(formData[key]) ? 'Phone number should not contain letters' : formData[key].length !== 10 ? 'Phone number should be exactly 10 digits': '';
          break;
        case 'email':
          error = formData[key].trim() === '' ? 'Email is required' : !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData[key]) ? 'Email is invalid' : '';
          break;
        case 'password':
          error = formData[key].trim() === '' ? 'Password is required' : !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/.test(formData[key]) ? 'Password is invalid, please make sure it has at least: uppercase letters, lowercase Letters and Numbers' : '';
          break;
        case 'confirmPassword':
          error = formData[key].trim() === '' ? 'Confirm password is required' : formData[key] !== formData.password ? 'Passwords do not match' : '';
          break;
        default:
          break;    
      }
      setError({...error, [key]: error});
      if (error) return;
    }

    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.firstName,
          middle_initial: formData.middleInitial,
          frst_lst_name: formData.lastName,
          scnd_lst_name: formData.scndLastName,
          phone_number: formData.phone,
          summary: formData.summary,
          profile: formData.profile,
          emailVerification: false,
        }),
      });
  
      if (!response.ok) { //Manejo de errores 1
        throw new Error('Error en la solicitud al servidor');
      }
      const result = await response.json();
      if(result.message && result.message.includes('users_email_key')){//Manejo de errores 2
        setError(prevError => ({
          ...prevError,
          email: 'The email is already registered. Please use another email.'
        }));
        return;
      }
      console.log(result.message)
      // Everything turned out correct
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      });

      navigate('/login');

    } catch (error) {
      console.error('Error al enviar el formulario: ', error);
    }
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
            error={!!error.firstName}
            helperText={error.firstName}
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
            error={!!error.lastName}
            helperText={error.lastName}
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
            error={!!error.phone}
            helperText={error.phone}
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
            error={!!error.email}
            helperText={error.email}
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
            error={!!error.password}
            helperText={error.password}
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
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
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
