import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function CertificationModal({ open, onClose, onSave }) {
    const [formState, setFormState] = useState({
        certificationName: '',
        issuingOrganization: '',
        dateObtained: '',
        purpose: '',
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
        bgcolor: '#151515', // Dark background color
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
                    Add Certification
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        name="certificationName" 
                        label="Certification Name" 
                        value={formState.certificationName} 
                        onChange={handleChange} fullWidth 
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="issuingOrganization" 
                        label="Issuing Organization" 
                        value={formState.issuingOrganization} 
                        onChange={handleChange} fullWidth 
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="dateObtained" 
                        label="Date Obtained" 
                        type="date"
                        value={formState.dateObtained} 
                        onChange={handleChange} fullWidth 
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField 
                        name="purpose" 
                        label="Purpose" 
                        value={formState.purpose} 
                        onChange={handleChange} fullWidth 
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <Button type="submit" sx={{ mt: 2, color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }} variant="outlined">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default CertificationModal;
