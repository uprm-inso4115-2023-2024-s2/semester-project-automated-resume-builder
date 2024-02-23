import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Link, Grid, Typography } from '@mui/material';

const fieldConfigs = [
	{ name: 'firstName', label: 'First name', validation: value => value.trim() === '' ? 'First name is required' : /\d/.test(value) ? 'First name should not contain numbers' : '' },
	{ name: 'lastName', label: 'Last name', validation: value => value.trim() === '' ? 'Last name is required' : /\d/.test(value) ? 'Last name should not contain numbers' : '' },
	{ name: 'phone', label: 'Phone number', validation: value => value.trim() === '' ? 'Phone number is required' : /[a-zA-Z]/.test(value) ? 'Phone number should not contain letters' : value.length !== 10 ? 'Phone number should be exactly 10 digits' : '' },
	{ name: 'email', label: 'Email address', validation: value => value.trim() === '' ? 'Email is required' : !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) ? 'Email is invalid' : '' },
	{ name: 'password', label: 'Password', validation: value => value.trim() === '' ? 'Password is required' : !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value) ? 'Password must have at least 8 characters, including uppercase, lowercase, and numbers' : '', type: 'password' },
	{ name: 'confirmPassword', label: 'Confirm password', validation: (value, formData) => value.trim() === '' ? 'Confirm password is required' : value !== formData.password ? 'Passwords do not match' : '', type: 'password' },
];

const SignUpForm = ({ onSignUp }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
		agreeTerms: false,
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === 'checkbox' ? checked : value;
		setFormData(prev => ({ ...prev, [name]: newValue }));

		const newErrors = { ...errors };

		const error = validateField(name, newValue);
		if (error) {
			newErrors[name] = error;
		} else {
			delete newErrors[name];
		}

		setErrors(newErrors);
	};

	const validateField = (name, value) => {
		const field = fieldConfigs.find(field => field.name === name);
		if (!field) return '';
		return field.validation(value, formData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let hasError = false;
		const newErrors = {};

		fieldConfigs.forEach(({ name }) => {
			const error = validateField(name, formData[name]);
			if (error) {
				newErrors[name] = error;
				hasError = true;
			}
		});

		setErrors(newErrors);

		if (!hasError) {
			console.log('Form submitted', formData);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
				Sign Up
			</Typography>

			<Grid container spacing={2}>
				{fieldConfigs.map(({ name, label, type }) => (
					<Grid item xs={12} sm={name === 'email' || name === 'password' || name === 'confirmPassword' ? 12 : 6}>
						<TextField
							label={label}
							variant="outlined"
							key={name}
							name={name}
							value={formData[name]}
							onChange={handleChange}
							required
							fullWidth
							margin="normal"
							error={!!errors[name]}
							helperText={errors[name]}
							type={type || 'text'}
							InputLabelProps={{ style: { color: 'white' } }}
							inputProps={{ style: { color: 'white' } }}
						/>
					</Grid>
				))}
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox checked={formData.agreeTerms} onChange={handleChange} name="agreeTerms" />}
						key="agreeTerms"
						label={<React.Fragment>I agree with the <Link href="#" style={{ color: 'white' }}>terms and conditions</Link>.</React.Fragment>}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button type="submit" variant="contained" color="primary" fullWidth key="submit">
						Submit
					</Button>
				</Grid>
			</Grid>
		</form >
	);
};

export default SignUpForm;
