import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
// Import modal components
// import WorkExperienceModal from './WorkExperienceModal';
// Repeat for other modals as needed
import WorkExperienceModal from './ResumeModals/workExperienceModal.js';
import EducationModal from './ResumeModals/educationModal.js';

const ResumeInput = () => {
    const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);
    const [showEducationModal, setShowEducationModal] = useState(false);
    // Repeat for other categories
    const [workExperience, setWorkExperience] = useState([]);
    const [education, setEducation] = useState([]);
    // Repeat state management for other categories

    const handleSaveWorkExperience = (newItem) => {
        setWorkExperience(prev => [...prev, newItem]);
    };

    const handleSaveEducation = (newItem) => {
        setEducation(prev => [...prev, newItem]);
    };

    // Repeat save handlers for other categories
    return (
        <div>
            <Button onClick={() => setShowWorkExperienceModal(true)}>Add Work Experience</Button>
            <WorkExperienceModal
                open={showWorkExperienceModal}
                onClose={() => setShowWorkExperienceModal(false)}
                onSave={handleSaveWorkExperience}
            />

            <Button onClick={() => setShowEducationModal(true)}>Add Education</Button>
            <EducationModal
                open={showEducationModal}
                onClose={() => setShowEducationModal(false)}
                onSave={handleSaveEducation}
            />
            {/* Repeat for other categories */}
        </div>
    );
};

export default ResumeInput;
