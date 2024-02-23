import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

const modalStyles = {
  modalBox: {
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
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    mb: 2,
  },
};

const formStyles = {
  textField: {
    InputLabelProps: { style: { color: 'white' } },
    inputProps: { style: { color: 'white' } },
    margin: "normal",
    fullWidth: true,
  },
  saveButton: {
    mt: 2,
    color: 'light blue',
    borderColor: 'light blue',
    '&:hover': {
      borderColor: 'light blue',
    },
  },
};

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
        resetToDefault();
        onClose();
    };

    const resetToDefault = () => {
        setFormState({
            certificationName: '',
            issuingOrganization: '',
            dateObtained: '',
            purpose: '',
        });
    };

    return (
        <Modal open={open} onClose={() => { onClose(); resetToDefault(); }}>
            <Box sx={modalStyles.modalBox}>
                <Typography 
                    sx={modalStyles.title}
                    variant="h6"
                >
                    Add Certification
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        name="certificationName" 
                        label="Certification Name" 
                        value={formState.certificationName} 
                        onChange={handleChange}
                        {...formStyles.textField}
                    />
                    <TextField 
                        name="issuingOrganization" 
                        label="Issuing Organization" 
                        value={formState.issuingOrganization} 
                        onChange={handleChange}
                        {...formStyles.textField}
                    />
                    <TextField 
                        name="dateObtained" 
                        label="Date Obtained" 
                        type="date"
                        value={formState.dateObtained} 
                        onChange={handleChange}
                        InputLabelProps={{ ...formStyles.textField.InputLabelProps, shrink: true }}
                        inputProps={formStyles.textField.inputProps}
                        fullWidth
                        margin="normal"
                    />
                    <TextField 
                        name="purpose" 
                        label="Purpose" 
                        value={formState.purpose} 
                        onChange={handleChange}
                        {...formStyles.textField}
                    />
                    <Button type="submit" sx={formStyles.saveButton} variant="outlined">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default CertificationModal;