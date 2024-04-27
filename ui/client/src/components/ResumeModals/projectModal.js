import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function ProjectModal({ open, onClose, onSave }) {
    const [formState, setFormState] = useState({
        projectName: '',
        description: '',
        technologiesUsed: '',
        link: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const { technologiesUsed, ...rest } = formState;
        const projectToSave = {
            ...rest,
            technologiesUsed: technologiesUsed.split(',').map(item => item.trim()),
        };
        onSave(projectToSave);
        resetToDefault();
        onClose();
    };

    const resetToDefault = () => {
        setFormState({
            projectName: '',
            description: '',
            technologiesUsed: '',
            link: '',
        })
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        maxHeight: '70vh',
        bgcolor: '#9ed198',
        border: '2px solid ',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        overflowY: 'auto',
    };

    return (
        <Modal open={open} onClose={() => { onClose(); resetToDefault(); }}>
            <Box sx={style}>
                <Typography sx={{ color: 'black', fontWeight: 'bold', mb: 2 }} variant="h6">
                    Add Project
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        name="projectName"
                        label="Project Name"
                        value={formState.projectName}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={formState.description}
                        onChange={handleChange}
                        multiline
                        minRows={3}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: {  color: 'black', backgroundColor: 'white', borderRadius: '5px', padding: '15px', marginTop: '-16px', marginLeft: '-14px', marginRight: '-14px', marginBottom: '-17px', border: 'none' } }}
                        margin="normal"
                    />
                    <TextField
                        name="technologiesUsed"
                        label="Technologies Used (comma separated)"
                        value={formState.technologiesUsed}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="link"
                        label="Link"
                        value={formState.link}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <Button type="submit" sx={{ mt: 2, color: 'black', bgcolor: 'green', borderRadius: '20px', minWidth: '120px', '&:hover': { bgcolor: '#007F00' } }} variant="contained">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default ProjectModal;
