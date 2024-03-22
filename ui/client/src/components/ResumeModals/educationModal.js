import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

function EducationModal({ open, onClose, onSave }) {
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

    const [institutionNameErrorMessage, setInstitutionNameErrorMessage] = useState("");  
    const [degreeErrorMessage, setDegreeErrorMessage] = useState("");
    const [locationErrorMessage, setLocationErrorMessage] = useState("");
    const [startDateErrorMessage, setStartDateErrorMessage] = useState("");
    const [endDateErrorMessage, setEndDateErrorMessage] = useState("");
    const [gpaErrorMessage, setGpaErrorMessage] = useState("");
    const [relevantCoursesErrorMessage, setRelevantCoursesErrorMessage] = useState("");
    const [aboutErrorMessage, setAboutErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateinstitutionName = (institutionName) => {  
      let errorMessage = "";    

      if (institutionName === "") {  
          errorMessage = "Institution name is required";  
      }

      setInstitutionNameErrorMessage(errorMessage);  
    };


    const validateDegree = (degree) => {
    let errorMessage = "";   

    if (institutionDegree === "") {  
        errorMessage = "Degree is required";  
    }

    setDegreeErrorMessage(errorMessage);  
    };


    const validateLocation = (location) => {
    let errorMessage = "";    

    if (location === "") {  
        errorMessage = "location is required";  
    }

    setLocationErrorMessage(errorMessage);  
    };


    const validateStartDate = (startDate) => {
    let errorMessage = "";
    const re = /0[1-9][12][0-9]3[01]/; 

    if (startDate === "") {  
        errorMessage = "Start date is required";  
    }

    else if (!re.test(startDate)) {   
        errorMessage = "Start date is not valid";  
    }

    setStartDateErrorMessage(errorMessage);  

    };


    const validateEndDate = (endDate) => {
    let errorMessage = "";
    const re = /0[1-9][12][0-9]3[01]/; 

    if (endDate === "") {  
        errorMessage = "End date is required";  
    }

    else if (!re.test(endDate)) {   
        errorMessage = "End date is not valid";  
    }
    setEndDateErrorMessage(errorMessage);

    };

    const validateGpa = (gpa) => {
    let errorMessage = "";
    const re = /^[0-4]\.[0-9][0-9]$/; 

    if (gpa === "") {  
        errorMessage = "Gpa is required";  
    }

    else if (!re.test(gpa)) {   
        errorMessage = "Gpa is not valid (caution: 2 digits for decimal values required)";  
    }
    setGpaErrorMessage(errorMessage);

    };


    const validateRelevantCourses = (relevantCourses) => {
    let errorMessage = "";
    const re = /[A-Z]{4}[0-9]{4}/; 

    if (relevantCourses === "") {  
        errorMessage = "Courses are required";  
    }

    else if (!re.test(relevantCourses)) {   
        errorMessage = "Courses are not valid (caution: courses contain 4 capital letters followed by 4 digits)";  
    }
    setRelevantCoursesErrorMessage(errorMessage);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
        validateinstitutionName(institutionName);
        validateDegree(degree);
        validateLocation(location);
        validateStartDate(startDate);
        validateEndDate(endDate);
        validateGpa(gpa);
        validateRelevantCourses(relevantCourses);
          
        if (errorPresent()) {
            return;
        }
        
        const { relevantCourses, ...rest } = formState;
        const educationToSave = {
            ...rest,
            relevantCourses: relevantCourses.split(',').map(item => item.trim()), 
        };
        onSave(educationToSave);
        resetToDefault();
        onClose();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        setIsSubmitting(false);
    }
    }

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
        })
    }

    const style = {
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
    };


    return (
        <Modal open={open} onClose={() => { onClose(); resetToDefault(); }}>
            <Box sx={style}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', mb: 2 }} variant="h6">
                    Add Education
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        name="institutionName"
                        label="Institution Name"
                        value={formState.institutionName}
                        onChange={handleChange}
                        error={institutionNameErrorMessage !== ""}
                        helperText={institutionNameErrorMessage}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="degree"
                        label="Degree"
                        value={formState.degree}
                        onChange={handleChange}
                        error={degreeErrorMessage !== ""}
                        helperText={degreeErrorMessage}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="location"
                        label="Location"
                        value={formState.location}
                        onChange={handleChange}
                        error={locationErrorMessage !== ""}
                        helperText={locationErrorMessage}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="startDate"
                        label="Start Date"
                        type="date"
                        value={formState.startDate}
                        onChange={handleChange}
                        error={startDateErrorMessage !== ""}
                        helperText={startDateErrorMessage}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={formState.endDate}
                        onChange={handleChange}
                        error={endDateErrorMessage !== ""}
                        helperText={endDateErrorMessage}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="gpa"
                        label="GPA"
                        value={formState.gpa}
                        onChange={handleChange}
                        error={gpaErrorMessage !== ""}
                        helperText={gpaErrorMessage}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <TextField
                        name="relevantCourses"
                        label="Relevant Courses (comma separated)"
                        value={formState.relevantCourses}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
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
                        InputLabelProps={{ style: { color: 'white' } }}
                        inputProps={{ style: { color: 'white' } }}
                        margin="normal"
                    />
                    <Button type="submit" sx={{ mt: 2, color: 'light blue', borderColor: 'light blue', '&:hover': { borderColor: 'light blue' } }} variant="outlined">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default EducationModal;