import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography, Tooltip } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/HelpOutlineRounded';

export default function ResumeForm() {
  const [resume, setResume] = useState({
    name: '',
    email: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the submit action, e.g., sending data to a server or displaying it on the screen
    console.log(resume);
  };

//create tooltip with hint
const renderTooltip = (hint) => (
  <Tooltip title={hint} arrow>
    <QuestionMarkIcon />
  </Tooltip>
);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ mt: 5, backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant="h5" textAlign="center" color="white">
            Create Resume
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
            <Grid container direction="row" justifyContent="flex-end">
                {renderTooltip('Enter your full name')} 
            </Grid>
              {/* Name */}
              <TextField
                variant="filled"
                label="Name"
                name="name"
                value={resume.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
              />
              <Grid container direction="row" justifyContent="flex-end">
                {renderTooltip('Enter your email address')}
              </Grid>                  
              {/* Email */}
              <TextField
                variant="filled"
                label="Email"
                name="email"
                value={resume.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
              />
              <Grid container direction="row" justifyContent="flex-end">
                {renderTooltip('Write a brief summary of your professional background')}
              </Grid>
              {/* Summary */}
              <TextField
                variant="filled"
                label="Professional Summary"
                name="summary"
                value={resume.summary}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
              />
              <Grid container direction="row" justifyContent="flex-end">
                {renderTooltip('List your work experience, including job titles and responsibilities, and dates of employment, if applicable.')}
              </Grid>
              {/* Experience */}
              <TextField
                variant="filled"
                label="Work Experience"
                name="experience"
                value={resume.experience}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
              />
              <Grid container direction="row" justifyContent="flex-end">
                {renderTooltip('List your education, including degrees and schools attended, and dates of attendance, if applicable.')}
              </Grid>
              {/* Education */}
              <TextField
                variant="filled"
                label="Education"
                name="education"
                value={resume.education}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
              />
              <Grid container direction="row" justifyContent="flex-end">
                {renderTooltip('List your skills, including technical skills, certifications, and other relevant qualifications.')}
              </Grid>

              {/* Skills */}
              <TextField
                variant="filled"
                label="Skills"
                name="skills"
                value={resume.skills}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
              />
      
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Submit Resume
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
