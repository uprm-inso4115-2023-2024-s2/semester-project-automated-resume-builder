import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ResumeForm({ submitCallBack }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    // Pass the resume data to the parent component
    submitCallBack(resume);

    // Redirect to template.js after submission
    navigate('/resume/templates');
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ mt: 5, backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant="h5" textAlign="center" color="white">
            Create Resume
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
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
