import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography, Tooltip } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/HelpOutlineRounded';

export default function ResumeForm() {
	const [resume, setResume] = useState({
		name: '',
		email: '',
		summary: '',
		experience: '',
		education: '',
		skills: '',
	});

	function handleChange(e) {
		setResume({ ...resume, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(resume);
	}

	function renderTooltip(hint) {
		return (
			<Tooltip title={hint} arrow>
				<QuestionMarkIcon sx={{ ml: 1, cursor: 'help' }} aria-label={hint} />
			</Tooltip>
		);
	}

	const fields = [
		{ tooltip: 'Enter your full name', label: 'Name', name: 'name', multiline: false, },
		{ tooltip: 'Enter your email address', label: 'Email', name: 'email', multiline: false, },
		{ tooltip: 'Write a brief summary of your professional background', label: 'Professional Summary', name: 'summary', multiline: true, rows: 4, },
		{ tooltip: 'List your work experience, including job titles and responsibilities, and dates of employment, if applicable.', label: 'Work Experience', name: 'experience', multiline: true, rows: 4, },
		{ tooltip: 'List your education, including degrees and schools attended, and dates of attendance, if applicable.', label: 'Education', name: 'education', multiline: true, rows: 4, },
		{ tooltip: 'List your skills, including technical skills, certifications, and other relevant qualifications.', label: 'Skills', name: 'skills', multiline: true, rows: 4, },
	];

	return (
		<Grid container direction="column" alignItems="center" justifyContent="center">
			<Grid item xs={12} md={6} lg={4}>
				<Card sx={{ mt: 5, backgroundColor: '#1e272e', padding: '1rem' }}>
					<Typography variant="h5" textAlign="center" color="white">
						Create Resume
					</Typography>
					<CardContent>
						<form onSubmit={handleSubmit}>
							{fields.map(({ tooltip, label, name, multiline, rows }) => (
								<>
									<Grid container direction="row" justifyContent="flex-end">
										{renderTooltip(tooltip)}
									</Grid>
									<TextField
										variant="filled"
										label={label}
										name={name}
										value={resume[name]}
										onChange={handleChange}
										fullWidth
										margin="normal"
										InputLabelProps={{ style: { color: 'white' } }}
										inputProps={{ style: { color: 'white' }, multiline: multiline ?? false, rows: rows ?? 1 }}
									/>
								</>
							))}

							<Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
								Submit Resume
							</Button>
						</form>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}