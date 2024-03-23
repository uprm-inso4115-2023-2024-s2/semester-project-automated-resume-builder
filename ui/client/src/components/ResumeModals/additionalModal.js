import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function AdditionalModal({ open, onClose, onSave, onNext }) {
    const [formState, setFormState] = useState({
        institutionName: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '', 
        gpa: '',
        relevantCourses: '', 
        information: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const { relevantCourses, ...rest } = formState;
        const additionalToSave = {
            ...rest,
            relevantCourses: relevantCourses.split(',').map(item => item.trim()), 
        };
        onSave(additionalToSave);
        resetToDefault();
        onClose();
    };

    const handleNext = () => {
        onNext();
        onClose();
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
            information: '',
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
                    Additional Information
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        name="information"
                        label="Information"
                        value={formState.Information}
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

export default AdditionalModal