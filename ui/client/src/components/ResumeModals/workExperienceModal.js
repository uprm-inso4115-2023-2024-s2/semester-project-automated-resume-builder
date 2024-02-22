import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function WorkExperienceModal({ open, onClose, onSave }) {
    const [formState, setFormState] = useState({
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
        achievements: '',
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
        maxHeight: '70vh',
        bgcolor: '#202525',
        border: '2px solid #444',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        overflowY: 'auto',
    };
    
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', mb: 2 }} variant="h6">
                    Add Work Experience
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        name="jobTitle" 
                        label="Job Title" 
                        value={formState.jobTitle} 
                        onChange={handleChange} 
                        fullWidth 
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="companyName" 
                        label="Company Name" 
                        value={formState.companyName} 
                        onChange={handleChange} 
                        fullWidth 
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="location" 
                        label="Location" 
                        value={formState.location} 
                        onChange={handleChange} 
                        fullWidth 
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="startDate" 
                        label="Start Date" 
                        type="date" 
                        value={formState.startDate} 
                        onChange={handleChange} 
                        fullWidth 
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="endDate" 
                        label="End Date" 
                        type="date" 
                        value={formState.endDate} 
                        onChange={handleChange} 
                        fullWidth 
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="responsibilities" 
                        label="Responsibilities" 
                        value={formState.responsibilities} 
                        onChange={handleChange} 
                        fullWidth 
                        multiline
                        minRows={3}
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="achievements" 
                        label="Achievements" 
                        value={formState.achievements} 
                        onChange={handleChange} 
                        fullWidth 
                        multiline
                        minRows={3}
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <Button type="submit" sx={{ mt: 2, color: 'light blue', borderColor: 'light blue', '&:hover': { borderColor: 'light blue' } }} variant="outlined">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default WorkExperienceModal;
