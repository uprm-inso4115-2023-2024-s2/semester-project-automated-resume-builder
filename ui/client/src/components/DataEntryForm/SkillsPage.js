import React, { useState } from 'react';
import { Typography, TextField, Button, Chip, Stack } from '@mui/material';
import './SkillsPage.css';

function SkillsPage() {
    const [skills, setSkills] = useState({
        technical: [],
        soft: [],
        languages: []
    });
    const [tempSkill, setTempSkill] = useState({
        technical: '',
        soft: '',
        languages: ''
    });
    // Initialize error states for each skill category
    const [errors, setErrors] = useState({
        technical: false,
        soft: false,
        languages: false
    });

    const handleAddSkill = (category) => {
        // Check if input is empty and set error state if true
        if (!tempSkill[category].trim()) {
            setErrors({...errors, [category]: true});
            return; // Prevent adding the skill if it's empty
        }
        setSkills({
            ...skills,
            [category]: [...skills[category], tempSkill[category]]
        });
        setTempSkill({ ...tempSkill, [category]: '' });
        setErrors({...errors, [category]: false}); // Reset error state after adding
    };

    const handleDeleteSkill = (category, index) => {
        const updatedSkills = skills[category].filter((_, i) => i !== index);
        setSkills({ ...skills, [category]: updatedSkills });
    };

    const handleChange = (category, value) => {
        if (errors[category]) {
            setErrors({...errors, [category]: false}); // Clear error when user starts typing
        }
        setTempSkill({ ...tempSkill, [category]: value });
    };

    return (
        <div className="skillsContainer">
            <h2>Skills</h2>
            {Object.keys(skills).map((category) => (
                <div key={category} className="skillFieldContainer">
                    <Typography variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)} Skills</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                        <TextField
                            error={errors[category]} // Apply error styling if error state is true
                            helperText={errors[category] ? "This field cannot be empty" : ""} // Display error message
                            className="skillInput"
                            label={`Add ${category} skill`}
                            variant="outlined"
                            value={tempSkill[category]}
                            onChange={(e) => handleChange(category, e.target.value)}
                            size="small"
                            InputLabelProps={{
                                className: 'skillInputLabel', 
                            }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'white', // Text color for the input field
                                }
                            }}
                        />
                        <Button
                            className="addButton"
                            sx={{
                                fontSize: '16px',
                                color: '#185626',
                                backgroundColor: '#60f583',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                padding: '10px 20px',
                                border: 'none',
                                '&:hover': {
                                    backgroundColor: '#45b55f',
                                    color: 'black',
                                },
                            }}
                            onClick={() => handleAddSkill(category)}
                        >
                            Add Another
                        </Button>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1} className="skillChipsContainer">
                        {skills[category].map((skill, index) => (
                            <Chip
                                key={index}
                                label={skill}
                                onDelete={() => handleDeleteSkill(category, index)}
                                className="skillChip"
                                deleteIcon={<span className="deleteIcon">x</span>}
                                sx = {{
                                    '& .deleteIcon:hover': {
                                        color: '#df1414',
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                </div>
            ))}
        </div>
    );
}

export default SkillsPage;
