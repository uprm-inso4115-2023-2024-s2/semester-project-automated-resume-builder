import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

const modalStyles = {
	box: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 600,
		maxHeight: '70vh',
		bgcolor: '#202525',
		border: '2px solid #444',
		boxShadow: 24,
		p: 4,
		borderRadius: '16px',
		overflowY: 'auto',
	},
	inputLabel: { style: { color: 'white' } },
	input: { style: { color: 'white' } },
	button: {
		mt: 2,
		color: 'light blue',
		borderColor: 'light blue',
		'&:hover': { borderColor: 'light blue' }
	},
};

function ProjectModal({ open, onClose, onSave }) {
	const [formState, setFormState] = useState({
		projectName: '',
		description: '',
		technologiesUsed: '',
		link: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState(prev => ({ ...prev, [name]: value }));
	};

	const handleSave = (e) => {
		e.preventDefault();
		const { technologiesUsed, ...rest } = formState;
		const projectToSave = {
			...rest,
			technologiesUsed: technologiesUsed.split(',').map(item => item.trim()),
		};
		onSave(projectToSave);
		resetToDefault();
		onClose();
	};

	const resetToDefault = () => {
		setFormState({
			projectName: '',
			description: '',
			technologiesUsed: '',
			link: '',
		});
	};

	return (
		<Modal open={open} onClose={() => { onClose(); resetToDefault(); }}>
			<Box sx={modalStyles.box}>
				<Typography sx={{ color: 'white', fontWeight: 'bold', mb: 2 }} variant="h6">
					Add Project
				</Typography>
				<form onSubmit={handleSave}>
					{Object.entries(formState).map(([key, value]) => (
						<TextField
							key={key}
							name={key}
							label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} // Convert camelCase to words
							value={value}
							onChange={handleChange}
							fullWidth
							multiline={key === 'description'}
							minRows={key === 'description' ? 3 : 1}
							InputLabelProps={modalStyles.inputLabel}
							inputProps={modalStyles.input}
							margin="normal"
						/>
					))}
					<Button type="submit" sx={modalStyles.button} variant="outlined">
						Save
					</Button>
				</form>
			</Box>
		</Modal>
	);
}

export default ProjectModal;