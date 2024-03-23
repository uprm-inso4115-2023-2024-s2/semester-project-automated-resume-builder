import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function CareerObjModal({ open, onClose, onSave, onNext }) {
    const [formState, setFormState] = useState({
        Question1: '',
        Question2: '',
        Question3: '',
        relevantCourses: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const { relevantCourses, ...rest } = formState;
        const careerObjModalToSave = {
            ...rest,
            relevantCourses: relevantCourses.split(',').map(item => item.trim()), 
        };
        onSave(careerObjModalToSave);
        resetToDefault();
        onClose();
    };

    const handleNext = () => {
        onNext();
    };

    const resetToDefault = () => {
        setFormState({
            Question1: '',
            Question2: '',
            Question3: '',
            relevantCourses: '', 
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
                    Add Career Objectives
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        name="Question1"
                        label="What are your long-term career aspirations?"
                        value={formState.Question1}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="Question2"
                        label="What specific role or position are you aiming for?"
                        value={formState.Question2}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px'  } }}
                        margin="normal"
                    />
                    <TextField
                        name="Question3"
                        label="What industries are you interested in working in?"
                        value={formState.Question3}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white',  borderRadius: '5px'  } }}
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

export default CareerObjModal;
