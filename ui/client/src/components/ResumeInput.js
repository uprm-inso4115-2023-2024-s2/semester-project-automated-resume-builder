import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
// Import modal components
// import WorkExperienceModal from './WorkExperienceModal';
// Repeat for other modals as needed
import WorkExperienceModal from './ResumeModals/workExperienceModal.js';

const ResumeInput = () => {
    const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);
    // Repeat for other categories
    const [workExperience, setWorkExperience] = useState([]);
    // Repeat state management for other categories

    const handleSaveWorkExperience = (newItem) => {
        setWorkExperience(prev => [...prev, newItem]);
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
            {/* Repeat for other categories */}
        </div>
    );
};

export default ResumeInput;
