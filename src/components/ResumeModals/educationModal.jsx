import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

// Define modalStyles for centralized styling
const modalStyles = {
	modalBox: {
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
	inputLabelProps: { style: { color: 'white' } },
	inputProps: { style: { color: 'white' } },
	buttonStyle: {
		mt: 2, color: 'light blue', borderColor: 'light blue', '&:hover': { borderColor: 'light blue' }
	},
};

function EducationModal({ open, onClose, onSave }) {
	const [formState, setFormState] = useState({
		institutionName: '',
		degree: '',
		location: '',
		startDate: '',
		endDate: '',
		gpa: '',
		relevantCourses: '',
		about: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState(prev => ({ ...prev, [name]: value }));
	};

	const handleSave = (e) => {
		e.preventDefault();
		const { relevantCourses, ...rest } = formState;
		const educationToSave = {
			...rest,
			relevantCourses: relevantCourses.split(',').map(item => item.trim()),
		};
		onSave(educationToSave);
		resetToDefault();
		onClose();
	};

	const resetToDefault = () => {
		setFormState({
			institutionName: '',
			degree: '',
			location: '',
			startDate: '',
			endDate: '',
			gpa: '',
			relevantCourses: '',
			about: '',
		});
	};

	return (
		<Modal open={open} onClose={() => { onClose(); resetToDefault(); }}>
			<Box sx={modalStyles.modalBox}>
				<Typography sx={{ color: 'white', fontWeight: 'bold', mb: 2 }} variant="h6">
					Add Education
				</Typography>
				<form onSubmit={handleSave}>
					{Object.keys(formState).map((key) => (
						<TextField
							key={key}
							name={key}
							label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} // Converts camelCase to words
							value={formState[key]}
							onChange={handleChange}
							fullWidth
							margin="normal"
							type={key.includes('Date') ? 'date' : 'text'}
							multiline={key === 'about'}
							minRows={key === 'about' ? 3 : 1}
							InputLabelProps={key.includes('Date') ? { ...modalStyles.inputLabelProps, shrink: true } : modalStyles.inputLabelProps}
							inputProps={modalStyles.inputProps}
						/>
					))}
					<Button type="submit" sx={modalStyles.buttonStyle} variant="outlined">
						Save
					</Button>
				</form>
			</Box>
		</Modal>
	);
}

export default EducationModal;