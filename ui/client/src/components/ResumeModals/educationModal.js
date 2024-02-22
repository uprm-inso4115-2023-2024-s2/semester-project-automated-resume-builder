import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function EducationModal({ open, onClose, onSave }) {
    const [formState, setFormState] = useState({
        institutionName: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '', 
        gpa: '',
        relevantCourses: [], 
        about: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formState); 
        onClose(); 
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        width: 600, 
        bgcolor: '#151515', 
        border: '2px solid #333', 
        boxShadow: 24,
        p: 4, 
        borderRadius: '16px',
    };
    
    
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography 
                    sx={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        mb: 2 
                    }}
                    variant="h6"
                >
                    Add Education
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        name="institutionName" 
                        label="Institution name" 
                        value={formState.institutionName} 
                        onChange={handleChange} fullWidth 
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <Button type="submit">Save</Button>
                </form>
            </Box>
        </Modal>
    );
}

export default EducationModal
