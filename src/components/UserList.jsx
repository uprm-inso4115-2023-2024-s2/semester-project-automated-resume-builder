import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const styles = {
	card: {
		marginBottom: ".7rem",
		backgroundColor: '#1e272e',
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	userInfo: {
		color: 'white',
	},
	actionButton: {
		margin: '.5rem',
	},
};

export default function UserList() {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	const { globalUser } = useUser();

	const loadUsers = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.error("Failed to load users", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
				method: "DELETE",
			});
			setUsers(users.filter(user => user.user_id !== id));
		} catch (error) {
			console.error("Failed to delete user", error);
		}
	};

	const handleDownload = async (id) => {
		try {
			const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}/dummyResume/download`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (res.status === 200) {
				const blob = await res.blob();
				const fileURL = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
				window.open(fileURL);
			}
		} catch (error) {
			console.error("Failed to download file", error);
		}
	};

	useEffect(() => {
		loadUsers();
	}, []);

	return (
		<>
			<h1>User List {globalUser.name}</h1>
			{users.map((user) => (
				<Card key={user.user_id} sx={styles.card}>
					<CardContent sx={styles.cardContent}>
						<div sx={styles.userInfo}>
							<Typography>{user.email}</Typography>
							<Typography>{user.name}</Typography>
						</div>
						<div>
							<Button variant='contained' color='inherit' onClick={() => navigate(`/users/${user.user_id}/edit`)} sx={styles.actionButton}>
								Edit
							</Button>
							<Button variant='contained' color='warning' onClick={() => handleDelete(user.user_id)} sx={styles.actionButton}>
								Delete
							</Button>
							<Button variant='contained' color='inherit' onClick={() => handleDownload(user.user_id)} sx={styles.actionButton}>
								Download
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</>
	);
}