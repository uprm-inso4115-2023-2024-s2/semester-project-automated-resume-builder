import React, { useState } from 'react';
import { 
    Button, 
    TextField, 
    Typography, 
    Grid,
    FormControl,
    Container,
    CircularProgress,
} from '@mui/material';
import './PersonalInfo.css';

const PersonalInfo = () => {
    const [firstName, setFirstName] = useState("");
    const [middleInitial, setMiddleInitial] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [socials, setSocials] = useState("");
    const [summary, setSummary] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

    const validateEmail = (email) => {
        let errorMessage = "";
        const re = /\S+@\S+\.\S+/;

        // Field is required
        if (email === "") {
            errorMessage = "Email is required";
        }
        // Invalid email
        else if (!re.test(email)) {
            errorMessage = "Email is not valid";
        }

        setEmailErrorMessage(errorMessage);
    };

    const validatePhoneNumber = (phoneNumber) => {
        let errorMessage = "";
        const re = /^\d{3}-\d{3}-\d{4}$/;
        if (phoneNumber.length > 0 && !re.test(phoneNumber)) {
            errorMessage = "Phone number is not valid";
        }

        setPhoneNumberErrorMessage(errorMessage);
    };

    const validateName = (name, label, setter) => {
        let errorMessage = "";
        if (name === "") {
            errorMessage = `${label} is required`;
        }
        setter(errorMessage);
    };

    const errorPresent = () => {
        return emailErrorMessage !== "" || 
            phoneNumberErrorMessage !== "" || 
            firstNameErrorMessage !== "" || 
            lastNameErrorMessage !== "";
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            validateEmail(email);
            validatePhoneNumber(phoneNumber);
            validateName(firstName, "First name", setFirstNameErrorMessage);
            validateName(lastName, "Last name", setLastNameErrorMessage);
            
            if (errorPresent()) {
                return;
            }

            console.log("Form submitted");
            // TODO: Save data to database
            // TODO: Redirect to next page
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className='personal-info-container'>
            <FormControl>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        color: 'black', 
                        fontWeight: 'bold', 
                        mt: 2 ,
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                >
                    Personal Information
                </Typography>

                <Grid container spacing={2} >
                    {/* First row */}
                    <Grid container item xs={12} spacing={2} >
                        <Grid item xs={5}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            placeholder='E.g. John'
                            value={firstName}
                            className='input-field'
                            onChange={(e) => setFirstName(e.target.value)}
                            error={firstNameErrorMessage !== ""}
                            helperText={firstNameErrorMessage}
                            fullWidth
                            required
                        />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Middle Name (initial)"
                                variant="outlined"
                                name="middleInitial"
                                placeholder='E.g. A'
                                value={middleInitial}
                                className='input-field'
                                onChange={(e) => setMiddleInitial(e.target.value)}
                                inputProps={{ maxLength: 1 }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                name="lastName"
                                placeholder='E.g. Doe'
                                value={lastName}
                                className='input-field'
                                onChange={(e) => setLastName(e.target.value)}
                                error={lastNameErrorMessage !== ""}
                                helperText={lastNameErrorMessage}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    
                    {/* Second row */}
                    <Grid container item spacing={2}> 
                        <Grid item xs={6}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                name="email"
                                placeholder='E.g. john.doe@gmail.com'
                                value={email}
                                className='input-field'
                                onChange={(e) => setEmail(e.target.value)}
                                error={emailErrorMessage !== ""}
                                helperText={emailErrorMessage}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                name="phoneNumber"
                                placeholder='E.g. 123-456-7890'
                                value={phoneNumber}
                                className='input-field'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                error={phoneNumberErrorMessage !== ""}
                                helperText={phoneNumberErrorMessage}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    {/* Third row */}
                    <Grid item xs={12}> 
                        <TextField
                            label="Socials"
                            variant="outlined"
                            name="socials"
                            placeholder='LinkedIn, GitHub, etc. (separated by commas)'
                            value={socials}
                            className='input-field'
                            onChange={(e) => setSocials(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    {/* Fourth row */}
                    <Grid item xs={12}> 
                        <TextField
                            label="Professional summary"
                            variant="outlined"
                            name="summary"
                            value={summary}
                            className='input-field'
                            onChange={(e) => setSummary(e.target.value)}
                            multiline
                            fullWidth
                            rows={5}
                        />
                    </Grid>
                </Grid>
                <Button 
                    variant="contained"
                    onClick={handleOnSubmit}
                    disabled={isSubmitting}
                    sx={{
                        background: 'rgb(84, 104, 89)',
                        marginTop: '20px',
                        marginBottom: '20px',
                        width: '10%',
                    }}
                >
                    {isSubmitting ? <CircularProgress className='circular-progress' size={25} /> : "Next"}
                </Button>
            </FormControl>
        </Container>
    );

};

export default React.memo(PersonalInfo);
