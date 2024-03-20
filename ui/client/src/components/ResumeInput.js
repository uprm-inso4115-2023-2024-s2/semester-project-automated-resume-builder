import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, List, ListItemText, ListItem, Grid } from '@mui/material';
// Import modal components
// import WorkExperienceModal from './WorkExperienceModal';
// Repeat for other modals as needed
import WorkExperienceModal from './ResumeModals/workExperienceModal.js';
import EducationModal from './ResumeModals/educationModal.js';
import CertificationModal from './ResumeModals/certificationModal.js';
import ProjectModal from './ResumeModals/projectModal.js'
import AdditionalModal from './ResumeModals/additionalModal.js'
import CareerObjModal from './ResumeModals/careerObjModal.js'

const ResumeInput = () => {
    const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showAdditionalModal, setShowAdditionalModal] = useState(false);
    const [showCareerObjModal, setShowCareerObjModal] = useState(false);

    const [careerObj, setCareerObjModal] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState([]);
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

    const handleChangePersonalInfo = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveItem = (setItem) => (newItem) => {
        setItem(prevItems => [...prevItems, newItem]);
    };
    
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
            <Grid container spacing={2} sx={{mb: 3}}> 
      
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

                <Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px'}}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        mt: 2 
                        }}
                    >
                        Career Objectives
                    </Typography>
                    <List>
                        {workExperience.map((experience, index) => (
                            <ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525'}}>
                                <ListItemText primary={experience.jobTitle} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => setShowCareerObjModal(true)}>Add Career Objective</Button>
                    <CareerObjModal
                        open={showCareerObjModal}
                        onClose={() => setShowCareerObjModal(false)}
                        onSave={handleSaveItem(setCareerObjModal)}
                    />
                </Grid>

                {/* Work Experience Section */}
                <Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px'}}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        mt: 2 
                        }}
                    >
                        Work Experience
                    </Typography>
                    <List>
                        {careerObj.map((experience, index) => (
                            <ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525'}}>
                                <ListItemText primary={experience.jobTitle} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => setShowWorkExperienceModal(true)}>Add Work Experience</Button>
                    <WorkExperienceModal
                        open={showWorkExperienceModal}
                        onClose={() => setShowWorkExperienceModal(false)}
                        onSave={handleSaveItem(setWorkExperience)}
                    />
                </Grid>

                {/* Education Section */}
                <Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px'}}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        mt: 2 
                        }}
                    >
                        Education
                    </Typography>
                    <List>
                        {education.map((edu, index) => (
                            <ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525'}}>
                                <ListItemText primary={edu.institutionName} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => setShowEducationModal(true)}>Add Education</Button>
                    <EducationModal
                        open={showEducationModal}
                        onClose={() => setShowEducationModal(false)}
                        onSave={handleSaveItem(setEducation)}
                    />
                </Grid>

                {/* Certification Section */}
                <Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px'}}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        mt: 2 
                        }}
                    >
                        Certifications
                    </Typography>
                    <List>
                        {certifications.map((cert, index) => (
                            <ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525'}}>
                                <ListItemText primary={cert.certificationName} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => setShowCertificationModal(true)}>Add Certification</Button>
                    <CertificationModal
                        open={showCertificationModal}
                        onClose={() => setShowCertificationModal(false)}
                        onSave={handleSaveItem(setCertifications)}
                    />
                </Grid>

                {/* Project Section */}
                <Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px'}}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        mt: 2 
                        }}
                    >
                        Projects
                    </Typography>
                    <List>
                        {projects.map((project, index) => (
                            <ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525'}}>
                                <ListItemText primary={project.projectName} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => setShowProjectModal(true)}>Add Project</Button>
                    <ProjectModal
                        open={showProjectModal}
                        onClose={() => setShowProjectModal(false)}
                        onSave={handleSaveItem(setProjects)}
                    />
                </Grid>
                {/* Education Section */}
                <Grid item xs={12} sx={{ border: '1px solid #666', p: 2, mt: 2, borderRadius: '4px'}}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        mt: 2 
                        }}
                    >
                        Additional Information
                    </Typography>
                    <List>
                        {additionalInfo.map((edu, index) => (
                            <ListItem key={index} sx={{ border: '1px solid #666', p: 1, mb: 1, borderRadius: '4px', bgcolor: '#252525'}}>
                                <ListItemText primary={edu.institutionName} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => setShowAdditionalModal(true)}>Add Info</Button>
                    <AdditionalModal
                        open={showAdditionalModal}
                        onClose={() => setShowAdditionalModal(false)}
                        onSave={handleSaveItem(setAdditionalInfo)}
                    />
                </Grid>

            </Grid>
        </div>
    );
};

export default ResumeInput;
