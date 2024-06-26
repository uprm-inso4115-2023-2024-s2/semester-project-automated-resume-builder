import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function WorkExperienceModal({ open, onClose, onSave, onAutoComplete }) {
    const [formState, setFormState] = useState({
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '--/--/--',
        endDate: '--/--/--',
        responsibilities: '',
        achievements: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formState);
        resetToDefault();
        onClose();
    };

    const resetToDefault = () => {
        setFormState({
            jobTitle: '',
            companyName: '',
            location: '',
            startDate: '--/--/--',
            endDate: '--/--/--',
            responsibilities: '',
            achievements: '',
        })
    }

    const handleAutoCompleteResponsabilities = async () => {
        if (onAutoComplete) {
            try {
                const newText = await onAutoComplete(formState.responsibilities);
                setFormState(prevState => ({
                    ...prevState,
                    responsibilities: newText
                }));
            } catch (error) {
                console.error('Error during autocomplete', error);
            }
        }
    };

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
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography sx={{ color: 'black', fontWeight: 'bold', mb: 2 }} variant="h6">
                    Add Work Experience
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="jobTitle"
                        label="Job Title"
                        value={formState.jobTitle}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="companyName"
                        label="Company Name"
                        value={formState.companyName}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="location"
                        label="Location"
                        value={formState.location}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="startDate"
                        label="Start Date"
                        type="date"
                        value={formState.startDate}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={formState.endDate}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="responsibilities"
                        label="Responsibilities"
                        value={formState.responsibilities}
                        onChange={handleChange}
                        multiline
                        minRows={3}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px', padding: '15px', marginTop: '-16px', marginLeft: '-14px', marginRight: '-14px', marginBottom: '-17px', border: 'none' } }}
                        margin="normal"
                    />
                    <TextField
                        name="achievements"
                        label="Achievements"
                        value={formState.achievements}
                        onChange={handleChange}
                        multiline
                        minRows={3}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px', padding: '15px', marginTop: '-16px', marginLeft: '-14px', marginRight: '-14px', marginBottom: '-17px', border: 'none' } }}
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            sx={{ mt: 2, color: 'black', bgcolor: 'green', borderRadius: '20px', minWidth: '120px', '&:hover': { bgcolor: '#007F00' } }} variant="contained"
                            onClick={handleAutoCompleteResponsabilities}
                        >
                            Autocompletar
                        </Button>
                        <Button
                            type="submit"
                            sx={{ mt: 2, color: 'black', bgcolor: 'green', borderRadius: '20px', minWidth: '120px', '&:hover': { bgcolor: '#007F00' } }} variant="contained"
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default WorkExperienceModal;
