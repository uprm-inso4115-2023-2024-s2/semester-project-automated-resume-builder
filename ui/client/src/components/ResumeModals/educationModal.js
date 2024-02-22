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
        relevantCourses: '', // For simplicity in form handling, starting as a string
        about: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    // Convert string inputs to arrays as needed for relevantCourses
    const handleSave = (e) => {
        e.preventDefault();
        const { relevantCourses, ...rest } = formState;
        const educationToSave = {
            ...rest,
            relevantCourses: relevantCourses.split(',').map(item => item.trim()), // Splitting by comma and trimming
        };
        onSave(educationToSave);
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
                    Add Education
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        name="institutionName"
                        label="Institution Name"
                        value={formState.institutionName}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="degree"
                        label="Degree"
                        value={formState.degree}
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
                        name="gpa"
                        label="GPA"
                        value={formState.gpa}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="relevantCourses"
                        label="Relevant Courses (comma separated)"
                        value={formState.relevantCourses}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="about"
                        label="About"
                        value={formState.about}
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

export default EducationModal;
