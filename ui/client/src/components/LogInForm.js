import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useUser } from '../contexts/UserContext';


const LogInForm  = (onLogIn) => {

  const { globalUser, setGlobalUser } = useUser();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);


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
        const data = await response.json(); // Si esperas una respuesta en JSON
        console.log("Respuesta del servidor:", data);
        // Aquí puedes redirigir al usuario o hacer algo con los datos
        localStorage.setItem('userToken', data.token)
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
          password: ""
        })
      } else {
        console.error("Respuesta fallida del servidor:", response.status);
      }
    }catch(error){

    }

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