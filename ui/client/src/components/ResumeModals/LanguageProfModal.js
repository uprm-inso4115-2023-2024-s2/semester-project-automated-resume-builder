import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function LanguageProfiencyModal({ open, onClose, onSave, onNext }) {
    const [formState, setFormState] = useState({
        language: '',
        proficiency: '',
    });

    const [errors, setErrors] = useState({
        language: '',
        proficiency: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' })); // Clear error when input changes
    };

    const handleSave = (e) => {
        e.preventDefault();

        const languageError = validateLanguage(formState.language);
        const proficiencyError = validateProficiency(formState.proficiency);

        if (languageError || proficiencyError) {
            setErrors({
                language: languageError,
                proficiency: proficiencyError,
            });
            return;
        }

        onSave(formState);
        resetToDefault();
        onClose();
    };

    const handleNext = () => {
        onNext();
    };

    const resetToDefault = () => {
        setFormState({
            language: '',
            proficiency: '',
        });
    };

    const validateLanguage = (language) => {
        if (!language) {
            return 'Please enter a language.';
        }
        // Example validation logic (you can replace it with your own logic or API call)
        const knownLanguages = ['English', 'Spanish', 'French', 'German', 'Italian'];
        if (!knownLanguages.includes(language)) {
            return 'Please enter a valid language.';
        }
        return '';
    };

    const validateProficiency = (proficiency) => {
        if (!proficiency) {
            return 'Please enter a proficiency level.';
        }
        const validProficiencies = ['beginner', 'intermediate', 'advanced', 'fluent'];
        if (!validProficiencies.includes(proficiency.toLowerCase())) {
            return 'Please enter a valid proficiency level (beginner, intermediate, advanced, fluent).';
        }
        return '';
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
                    Add Proficient Languages
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        name="language"
                        label="Language"
                        value={formState.language}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                        error={!!errors.language}
                        helperText={errors.language}
                    />
                    <TextField
                        name="proficiency"
                        label="Proficiency: beginner, intermediate, advanced, fluent"
                        value={formState.proficiency}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'black' } }}
                        inputProps={{ style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' } }}
                        margin="normal"
                        error={!!errors.proficiency}
                        helperText={errors.proficiency}
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

export default LanguageProfiencyModal;
