import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const formStyles = {
	title: {
		color: 'white',
		fontWeight: 'bold',
		mt: 2,
	},
	textField: {
		InputLabelProps: { style: { color: 'white' } },
		inputProps: { style: { color: 'white' } },
		margin: "normal",
		fullWidth: true,
	},
	submitButton: {
		mt: 2,
		fullWidth: true,
	},
};

function LogInForm({ onLogIn }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	function handleChange(e) {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(formData);
		setFormData({
			email: '',
			password: '',
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<Typography
				variant="h5"
				sx={formStyles.title}
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
				{...formStyles.textField}
			/>

			<TextField
				label="Password"
				variant="outlined"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				required
				{...formStyles.textField}
			/>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				sx={formStyles.submitButton}
			>
				Submit
			</Button>
		</form>
	);
}

export default LogInForm;