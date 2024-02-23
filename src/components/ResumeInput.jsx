import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, List, ListItemText, ListItem, Grid } from '@mui/material';
import WorkExperienceModal from './ResumeModals/workExperienceModal.jsx';
import EducationModal from './ResumeModals/educationModal.jsx';
import CertificationModal from './ResumeModals/certificationModal.jsx';
import ProjectModal from './ResumeModals/projectModal.jsx';

const ResumeInput = () => {
	const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);
	const [showEducationModal, setShowEducationModal] = useState(false);
	const [showCertificationModal, setShowCertificationModal] = useState(false);
	const [showProjectModal, setShowProjectModal] = useState(false);

	const [workExperience, setWorkExperience] = useState([]);
	const [education, setEducation] = useState([]);
	const [certifications, setCertifications] = useState([]);
	const [projects, setProjects] = useState([]);
	const [personalInfo, setPersonalInfo] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		professionalSummary: '',
	});

	const handleChangePersonalInfo = (event) => {
		const { name, value } = event.target;
		setPersonalInfo(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSaveItem = (setItem) => (newItem) => {
		setItem(prevItems => [...prevItems, newItem]);
	};

	const toggleWorkExperienceModal = () => setShowWorkExperienceModal(!showWorkExperienceModal);
	const toggleEducationModal = () => setShowEducationModal(!showEducationModal);
	const toggleCertificationModal = () => setShowCertificationModal(!showCertificationModal);
	const toggleProjectModal = () => setShowProjectModal(!showProjectModal);

	return (
		<div>
			<Typography
				variant="h4"
				sx={{
					color: 'white',
					fontWeight: 'bold',
					mt: 2
				}}
			>
				Resume Information
			</Typography>
			<Grid container spacing={2} sx={{ mb: 3 }}>
				{/* Personal Information Section */}
				<Grid item xs={12} sm={6}>
					<TextField
						label="First name"
						variant="outlined"
						name="firstName"
						value={personalInfo.firstName}
						onChange={handleChangePersonalInfo}
						required
						fullWidth
						margin="normal"
						InputLabelProps={{ style: { color: 'white' } }}
						inputProps={{ style: { color: 'white' } }}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Last name"
						variant="outlined"
						name="lastName"
						value={personalInfo.lastName}
						onChange={handleChangePersonalInfo}
						required
						fullWidth
						margin="normal"
						InputLabelProps={{ style: { color: 'white' } }}
						inputProps={{ style: { color: 'white' } }}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Phone number"
						variant="outlined"
						name="phone"
						value={personalInfo.phone}
						onChange={handleChangePersonalInfo}
						required
						fullWidth
						margin="normal"
						InputLabelProps={{ style: { color: 'white' } }}
						inputProps={{ style: { color: 'white' } }}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Email"
						variant="outlined"
						name="email"
						value={personalInfo.email}
						onChange={handleChangePersonalInfo}
						required
						fullWidth
						margin="normal"
						InputLabelProps={{ style: { color: 'white' } }}
						inputProps={{ style: { color: 'white' } }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Professional Summary"
						variant="outlined"
						name="professionalSummary"
						value={personalInfo.professionalSummary}
						onChange={handleChangePersonalInfo}
						required
						fullWidth
						multiline
						margin="normal"
						InputLabelProps={{ style: { color: 'white' } }}
						inputProps={{ style: { color: 'white' } }}
					/>
				</Grid>

				{/* Work Experience Section */}
				<Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px' }}>
					<Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
						Work Experience
					</Typography>
					<List>
						{workExperience.map((experience, index) => (
							<ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525' }}>
								<ListItemText primary={experience.jobTitle} />
							</ListItem>
						))}
					</List>
					<Button onClick={toggleWorkExperienceModal}>Add Work Experience</Button>
				</Grid>

				{/* Education Section */}
				<Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px' }}>
					<Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
						Education
					</Typography>
					<List>
						{education.map((edu, index) => (
							<ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525' }}>
								<ListItemText primary={edu.institutionName} />
							</ListItem>
						))}
					</List>
					<Button onClick={toggleEducationModal}>Add Education</Button>
				</Grid>

				{/* Certification Section */}
				<Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px' }}>
					<Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
						Certifications
					</Typography>
					<List>
						{certifications.map((cert, index) => (
							<ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525' }}>
								<ListItemText primary={cert.certificationName} />
							</ListItem>
						))}
					</List>
					<Button onClick={toggleCertificationModal}>Add Certification</Button>
				</Grid>

				{/* Project Section */}
				<Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px' }}>
					<Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
						Projects
					</Typography>
					<List>
						{projects.map((project, index) => (
							<ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525' }}>
								<ListItemText primary={project.projectName} />
							</ListItem>
						))}
					</List>
					<Button onClick={toggleProjectModal}>Add Project</Button>
				</Grid>
			</Grid>

			{/* Modals */}
			<WorkExperienceModal
				open={showWorkExperienceModal}
				onClose={toggleWorkExperienceModal}
				onSave={handleSaveItem(setWorkExperience)}
			/>
			<EducationModal
				open={showEducationModal}
				onClose={toggleEducationModal}
				onSave={handleSaveItem(setEducation)}
			/>
			<CertificationModal
				open={showCertificationModal}
				onClose={toggleCertificationModal}
				onSave={handleSaveItem(setCertifications)}
			/>
			<ProjectModal
				open={showProjectModal}
				onClose={toggleProjectModal}
				onSave={handleSaveItem(setProjects)}
			/>
		</div>
	);
};

export default ResumeInput;
