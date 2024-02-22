import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function ProjectModal({ open, onClose, onSave }) {
    const [formState, setFormState] = useState({
        projectName: '',
        description: '',
        technologiesUsed: '', // For simplicity in form handling, starting as a string
        link: '', // Also starting as a string for ease of input
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    // Convert string inputs to arrays as needed for technologiesUsed and links
    const handleSave = (e) => {
        e.preventDefault();
        const { technologiesUsed, ...rest } = formState;
        const projectToSave = {
            ...rest,
            technologiesUsed: technologiesUsed.split(',').map(item => item.trim()), // Splitting by comma and trimming
        };
        onSave(projectToSave);
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
                    Add Project
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        name="projectName"
                        label="Project Name"
                        value={formState.projectName}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={formState.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        minRows={3}
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="technologiesUsed"
                        label="Technologies Used (comma separated)"
                        value={formState.technologiesUsed}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="link"
                        label="Link"
                        value={formState.link}
                        onChange={handleChange}
                        fullWidth
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

export default ProjectModal;
