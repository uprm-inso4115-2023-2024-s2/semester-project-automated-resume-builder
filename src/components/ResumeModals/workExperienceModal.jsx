import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

const initialFormState = {
	jobTitle: '',
	companyName: '',
	location: '',
	startDate: '',
	endDate: '',
	responsibilities: '',
	achievements: '',
};

const modalStyle = {
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
};

const inputStyles = {
	InputLabelProps: { style: { color: 'white' } },
	inputProps: { style: { color: 'white' } },
};

function WorkExperienceModal({ open, onClose, onSave }) {
	const [formState, setFormState] = useState(initialFormState);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formState);
		resetToDefault();
		onClose();
	};

	const resetToDefault = () => setFormState(initialFormState);

	const renderTextField = (field, label, type = "text", multiline = false, minRows = null) => (
		<TextField
			name={field}
			label={label}
			type={type}
			value={formState[field]}
			onChange={handleChange}
			fullWidth
			multiline={multiline}
			minRows={minRows || undefined}
			margin="normal"
			InputLabelProps={type === 'date' ? { ...inputStyles.InputLabelProps, shrink: true } : inputStyles.InputLabelProps}
			inputProps={inputStyles.inputProps}
		/>
	);

	return (
		<Modal open={open} onClose={() => { onClose(); resetToDefault(); }}>
			<Box sx={modalStyle}>
				<Typography sx={{ color: 'white', fontWeight: 'bold', mb: 2 }} variant="h6">
					Add Work Experience
				</Typography>
				<form onSubmit={handleSubmit}>
					{renderTextField("jobTitle", "Job Title")}
					{renderTextField("companyName", "Company Name")}
					{renderTextField("location", "Location")}
					{renderTextField("startDate", "Start Date", "date")}
					{renderTextField("endDate", "End Date", "date")}
					{renderTextField("responsibilities", "Responsibilities", "text", true, 3)}
					{renderTextField("achievements", "Achievements", "text", true, 3)}
					<Button type="submit" sx={{ mt: 2, color: 'light blue', borderColor: 'light blue', '&:hover': { borderColor: 'light blue' } }} variant="outlined">
						Save
					</Button>
				</form>
			</Box>
		</Modal>
	);
}

export default WorkExperienceModal;