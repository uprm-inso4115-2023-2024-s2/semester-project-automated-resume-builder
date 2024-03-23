import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function EducationModal({ open, onClose, onSave, onNext }) {
    const [formState, setFormState] = useState({
        institutionName: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '', 
        gpa: '',
        relevantCourses: '', 
        about: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const { relevantCourses, ...rest } = formState;
        const educationToSave = {
            ...rest,
            relevantCourses: relevantCourses.split(',').map(item => item.trim()), 
        };
        onSave(educationToSave);
        resetToDefault();
        onClose();
    };

    const handleNext = () => {
        onNext();
    };

    const resetToDefault = () => {
        setFormState({
            institutionName: '',
            degree: '',
            location: '',
            startDate: '',
            endDate: '', 
            gpa: '',
            relevantCourses: '', 
            about: '',
        });
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

    const buttonStyle = {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
    };
    
    return (
        <Modal open={open} onClose={() => { onClose(); resetToDefault(); }}>
            <Box sx={style}>
                <Typography sx={{ color: 'black', fontWeight: 'bold', mb: 2 }} variant="h6">
                    Add Education
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        name="institutionName"
                        label="Institution Name"
                        value={formState.institutionName}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="degree"
                        label="Degree"
                        value={formState.degree}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px'  } }}
                        margin="normal"
                    />
                    <TextField
                        name="location"
                        label="Location"
                        value={formState.location}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px'  } }}
                        margin="normal"
                    />
                    <TextField
                        name="startDate"
                        label="Start Date"
                        type="date"
                        value={formState.startDate}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' }, shrink: true }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px'  } }}
                        margin="normal"
                    />
                    <TextField
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={formState.endDate}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' }, shrink: true }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px'  } }}
                        margin="normal"
                    />
                    <TextField
                        name="gpa"
                        label="GPA"
                        value={formState.gpa}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px'  } }}
                        margin="normal"
                    />
                    <TextField
                        name="relevantCourses"
                        label="Relevant Courses (comma separated)"
                        value={formState.relevantCourses}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px'  } }}
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
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px', padding: '15px', marginTop: '-16px', marginLeft: '-14px', marginRight: '-14px', marginBottom: '-17px', border: 'none' } }}
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="submit" sx={{ mt: 2, color: 'black', bgcolor: 'green', borderRadius: '20px', minWidth: '120px', '&:hover': { bgcolor: '#007F00' } }} variant="contained">
                            Save
                        </Button>
                        <Button sx={{ mt: 2, color: 'black', bgcolor: 'green', borderRadius: '20px', minWidth: '120px', '&:hover': { bgcolor: '#007F00' } }} variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default EducationModal;
