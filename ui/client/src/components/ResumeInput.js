import React, { useState } from 'react';
import { Modal, TextField, Button, Checkbox, FormControlLabel, Link, Grid, Typography } from '@mui/material';


const ResumeInput = (onSubmitResumeForm) => {

    //======================Start resume info lists==========================//

    const [workExperience, setWorkExperience] = useState([{
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
        achievements: '',
    }]);
    

    const [education, setEducation] = useState([{
        institutionName: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '', 
        gpa: '',
        relevantCourses: [], 
        about: '',
    }]);
    

    const [certifications, setCertifications] = useState([{
        certificationName: '',
        issuingOrganization: '', 
        dateObtained: '', 
        purpose: '', 
    }]);
    

    const [projects, setProjects] = useState([{
        projectName: '',
        description: '',
        technologiesUsed: [], 
        links: [],
    }]);

    //======================End resume info lists==========================//


    //======================Start user data input============================//
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        links: [],
        professionalSummary: '',
    });

    const [currentWorkExperience, setCurrentWorkExperience] = useState({
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
        achievements: '',
    });

    const [currentEducation, setCurrentEducation] = useState({
        institutionName: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '', 
        gpa: '',
        relevantCourses: [], 
        about: '',
    });

    const [currentCertification, setCurrentCertification] = useState({
        certificationName: '',
        issuingOrganization: '', 
        dateObtained: '', 
        purpose: '', 
    });

    const [currentProject, setCurrentProject] = useState({
        projectName: '',
        description: '',
        technologiesUsed: [], 
        links: [],
    });
    
    //======================End user data input============================//
    
    

    //======================Start functions=================================//

    const handleInputChange = (setter) => (e) => {
        const { name, value } = e.target;
        setter(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitForList = (setList, currentItem, resetItem) => (e) => {
        e.preventDefault();
        setList(prevList => [...prevList, currentItem]);
        resetItem(); // Reset the form to its initial state
    };

    return ((
        <div>
            Im alive :D
        </div>
    ))
}

export default ResumeInput 