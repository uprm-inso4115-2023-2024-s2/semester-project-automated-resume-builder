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
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', mb: 2 }}>
                    Add Skill
                </Typography>
                <TextField
                    label="Skill"
                    variant="outlined"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    fullWidth
                    InputLabelProps={{ style: { color: 'black' } }}
                    inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                    margin="normal"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                    <Button onClick={handleClose} sx={{ mt: 2, color: 'black', bgcolor: 'green', borderRadius: '20px', minWidth: '120px', '&:hover': { bgcolor: '#007F00' } }} variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} sx={{ mt: 2, color: 'black', bgcolor: 'green', borderRadius: '20px', minWidth: '120px', '&:hover': { bgcolor: '#007F00' } }} variant="contained">
                        Save
                    </Button>
                    {open && skill && (
                        <Button onClick={handleNext} sx={{ mt: 2, color: 'black', bgcolor: 'green', borderRadius: '20px', minWidth: '120px', '&:hover': { bgcolor: '#007F00' } }} variant="contained">
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}

export default SkillsModal;
