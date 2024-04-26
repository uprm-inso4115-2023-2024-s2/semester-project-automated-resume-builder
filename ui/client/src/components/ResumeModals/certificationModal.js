import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function CertificationModal({ open, onClose, onSave }) {
    const [formState, setFormState] = useState({
        certificationName: '',
        issuingOrganization: '',
        dateObtained: '--/--/--',
        purpose: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formState);
        resetToDefault();
        onClose();
    };

    const resetToDefault = () => {
        setFormState({
            certificationName: '',
            issuingOrganization: '',
            dateObtained: '--/--/--',
            purpose: '',
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
                <Typography
                    sx={{ color: 'black', fontWeight: 'bold', mb: 2 }} variant="h6">
                    Add Certification
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="certificationName"
                        label="Certification Name"
                        value={formState.certificationName}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="issuingOrganization"
                        label="Issuing Organization"
                        value={formState.issuingOrganization}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="dateObtained"
                        label="Date Obtained"
                        type="date"
                        value={formState.dateObtained}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                    />
                    <TextField
                        name="purpose"
                        label="Purpose"
                        value={formState.purpose}
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

export default CertificationModal;
