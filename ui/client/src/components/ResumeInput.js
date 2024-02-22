import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
// Import modal components
// import WorkExperienceModal from './WorkExperienceModal';
// Repeat for other modals as needed
import WorkExperienceModal from './ResumeModals/workExperienceModal.js';
import EducationModal from './ResumeModals/educationModal.js';
import CertificationModal from './ResumeModals/certificationModal.js';
import ProjectModal from './ResumeModals/projectModal.js'

const ResumeInput = () => {
    const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);

    const [workExperience, setWorkExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [projects, setProjects] = useState([]);

    const handleSaveItem = (setItem) => (newItem) => {
        setItem(prevItems => [...prevItems, newItem]);
    };
    
    return (
        <div>
            <Button onClick={() => setShowWorkExperienceModal(true)}>Add Work Experience</Button>
            <WorkExperienceModal
                open={showWorkExperienceModal}
                onClose={() => setShowWorkExperienceModal(false)}
                onSave={handleSaveItem(setWorkExperience)}
            />

            <Button onClick={() => setShowEducationModal(true)}>Add Education</Button>
            <EducationModal
                open={showEducationModal}
                onClose={() => setShowEducationModal(false)}
                onSave={handleSaveItem(setEducation)}
            />

            <Button onClick={() => setShowCertificationModal(true)}>Add Certification</Button>
            <CertificationModal
                open={showCertificationModal}
                onClose={() => setShowCertificationModal(false)}
                onSave={handleSaveItem(setCertifications)}
            />

            <Button onClick={() => setShowProjectModal(true)}>Add Project</Button>
            <ProjectModal
                open={showProjectModal}
                onClose={() => setShowProjectModal(false)}
                onSave={handleSaveItem(setProjects)}
            />
        </div>
    );
};

export default ResumeInput;
