import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SkillsModal({ open, onClose, onSave }) {
    const [skill, setSkill] = useState('');
    const navigate = useNavigate();

    const handleClose = () => {
        setSkill('');
        onClose();
    };

    // No guardar si la habilidad está vacía
    const handleSave = () => {
        if (!skill) {
            alert('Please enter at least one skill');
            return;
        } 
        onSave(skill);
        setSkill(''); 
    };

    const handleNext = () => {
        if (skill) {
            onSave(skill); // Opcional-> Guarda el skill actual antes de navegar
        }
        handleClose();
        // navigate('/Next'); // Cambiar a la siguiente pagina (hasta ahora es la ultima opcion)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400, 
        bgcolor: '#202525',
        border: '2px solid #444',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        color: 'white', 
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Add Skill
                </Typography>
                <TextField
                    label="Skill"
                    variant="outlined"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    inputProps={{ style: { color: 'white' } }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                    <Button onClick={handleClose} sx={{ mr: 1, color: 'light blue', borderColor: 'light blue', '&:hover': { borderColor: 'light blue' } }} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} sx={{ mr: 1, color: 'light blue', borderColor: 'light blue', '&:hover': { borderColor: 'light blue' } }} variant="outlined">
                        Save
                    </Button>
                    {open && skill && (
                        <Button onClick={handleNext} sx={{ color: 'green', borderColor: 'green', '&:hover': { borderColor: 'green' } }} variant="outlined">
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}

export default SkillsModal;
