import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const formStyles = {
	card: {
		mt: 5,
		backgroundColor: '#1e272e',
		padding: '1rem',
	},
	textField: {
		display: 'block',
		margin: '.5rem 0',
	},
	input: {
		color: 'white',
	},
	label: {
		color: 'white',
	},
};

export default function UserForm() {
	const { globalUser } = useUser();
	const [user, setUser] = useState({
		email: "",
		password: "",
		name: "",
		middle_initial: "",
		frst_lst_name: "",
		scnd_lst_name: "",
		phone_number: "",
		summary: "",
		profile: ""
	});
	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const loadUser = async () => {
			if (id) {
				setLoading(true);
				try {
					const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`);
					const data = await response.json();
					setUser(data);
					setEditing(true);
				} catch (error) {
					console.error("Failed to load user", error);
				} finally {
					setLoading(false);
				}
			}
		};

		loadUser();
	}, [id]);

	async function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			await fetch(`${process.env.REACT_APP_BACKEND_URL}/users${editing ? `/${id}` : ''}`, {
				method: editing ? 'PUT' : 'POST',
				body: JSON.stringify(user),
				headers: { 'Content-Type': 'application/json' },
			});
			navigate('/');
		} catch (error) {
			console.error("Failed to submit", error);
		} finally {
			setLoading(false);
		}
	};

	const formFields = [
		{ id: 'email', label: 'Email', type: 'email' },
		{ id: 'password', label: 'Password', type: 'password' },
		{ id: 'name', label: 'Name', type: 'text' },
		{ id: 'middle_initial', label: 'Middle Initial', type: 'text' },
		{ id: 'frst_lst_name', label: 'First Last Name', type: 'text' },
		{ id: 'scnd_lst_name', label: 'Second Last Name', type: 'text' },
		{ id: 'phone_number', label: 'Phone Number', type: 'tel' },
		{ id: 'summary', label: 'Summary', type: 'text', multiline: true, rows: 4 },
		{ id: 'profile', label: 'Profile', type: 'text', multiline: true, rows: 4 },
	];

	return (
		<Grid alignItems="center" justifyContent="center">
			<Grid item xs={12} md={6} lg={4}>
				<Card sx={formStyles.card}>
					<Typography variant="h5" textAlign="center" color="white">
						{editing ? "Edit User" : "Create User"}
					</Typography>
					<CardContent>
						<form onSubmit={handleSubmit}>
							{formFields.map(({ id, label, type, multiline, rows }) => (
								<>
									<TextField
										key={id}
										variant="filled"
										label={label}
										type={type}
										name={id}
										value={user[id]}
										onChange={handleChange}
										fullWidth
										margin="normal"
										multiline={multiline ?? false}
										rows={rows ?? 1}
										sx={formStyles.textField}
										InputProps={{ style: formStyles.input }}
										InputLabelProps={{ style: formStyles.input }}
									/>
								</>
							))}
							<Button variant="contained" color="primary" type="submit" disabled={loading || !user.email || !user.name}>
								{loading ? <CircularProgress color="inherit" size={24} /> : 'Save'}
							</Button>
						</form>
					</CardContent >
				</Card>
			</Grid>
		</Grid>
	);
}