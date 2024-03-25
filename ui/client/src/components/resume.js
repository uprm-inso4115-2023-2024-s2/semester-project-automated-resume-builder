import React, { useState, useRef } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography, Box, Modal, Paper, Link, styled, Drawer, List, ListItem, CardMedia, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';


const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function ResumeForm({ submitCallBack }) {
  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    title: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });
  const [isResumeModalOpen, setResumeModalOpen] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState(null);

  const location = useLocation();
  const templateName = location.state?.templateName;

  const navigate = useNavigate();

  const templateRef = useRef(null);
  const [isPdfPreviewModalOpen, setPdfPreviewModalOpen] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');


  // This array will handle our templates. Not much of a change.
  // Is there anyway to get these into a different file and import? Some refactoring would be nice to shrink it down
  let templateBase =  [];
  // bgColor
  const bgColor = location.state?.bgColor;
  console.log("TEST ", bgColor);


  templateBase.push(
    <Box sx={{ padding: '20px', backgroundColor:bgColor, color: 'black', fontFamily: 'Arial', fontSize: '14px' }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '3px' }}>{resume.name}</Typography>
    <Typography variant="h6" sx={{ fontSize: '15px' }}>{resume.title}</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Typography variant="subtitle1">{resume.phone}</Typography>
      <Typography variant="subtitle1">{resume.email}</Typography>
      <Typography variant="subtitle1">{resume.city}, {resume.country}</Typography>
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', borderBottom :  'solid'}}>SUMMARY</Typography>
    <Typography variant="body1" sx={{ marginBottom: '20px' }}>{resume.summary}</Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', borderBottom :  'solid' }}>PROFESSIONAL EXPERIENCE</Typography>
    {/* Map through experiences if it's an array or just display if it's a single string */}
    <Typography variant="body1" sx={{ marginBottom: '20px' }}>{resume.experience}</Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', borderBottom :  'solid' }}>TECHNICAL SKILLS</Typography>
    {/* Map through skills if they are an array or just display if it's a single string */}
    <Typography variant="body1" sx={{ marginBottom: '20px' }}>{resume.skills}</Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', borderBottom :  'solid' }}>EDUCATION</Typography>
    {/* Map through education if it's an array or just display if it's a single string */}
    <Typography variant="body1">{resume.education}</Typography>
  </Box>
  );
  


  templateBase.push(<Paper elevation={3} sx={{ padding: '20px', bgColor: 'white', color: 'black', fontFamily: 'Roboto, Arial, sans-serif' }}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>{resume.name}</Typography>
      <Typography variant="h6" sx={{ color: '#18A558' }}>{resume.title}</Typography>
      <Box sx={{ my: 2 }}>
        <Link href={`mailto:${resume.email}`} sx={{ display: 'block', color: '#34495E', textDecoration: 'none' }}>
          {resume.email}
        </Link>
        <Link href={`tel:${resume.phone}`} sx={{ display: 'block', color: '#34495E', textDecoration: 'none' }}>
          {resume.phone}
        </Link>
        <Typography variant="body1" sx={{ color: '#34495E' }}>{resume.city}</Typography>
      </Box>
      <Typography variant="body1" sx={{ color: '#34495E', mb: 2 }}>
        {resume.summary}
      </Typography>
      {/* Here you'd map over resume.experience, resume.education, etc. */}
    </Grid>
    <Grid item xs={12} md={4}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>AREAS OF EXPERTISE</Typography>
      {/* Map over areas of expertise */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mt: 2, mb: 1 }}>TECHNICAL SKILLS</Typography>
      {/* Map over technical skills */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mt: 2, mb: 1 }}>PERSONAL PROJECTS</Typography>
      {/* Map over personal projects */}
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mt: 2, mb: 1 }}>EDUCATION</Typography>
      {/* Map over education */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mt: 2, mb: 1 }}>INTERESTS</Typography>
      {/* Map over interests */}
    </Grid>
  </Grid>
  </Paper>);
  






  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitCallBack(resume);
    generateResume(templateName); // For example, can be dynamically set based on user input
  };

//create tooltip with hint
const renderTooltip = (hint) => (
  <Tooltip title={hint} arrow>
    <QuestionMarkIcon />
  </Tooltip>
);
  const generateResume = (templateType) => {
    let content = null;
    switch (templateType) {
      case 'Template 1':
        content = templateBase[0];
        break;
      case 'Template 2':
        content = templateBase[1];
        break;
      default:
        alert("Select a Template")
    }
    setGeneratedTemplate(content);
    setResumeModalOpen(true)
  };
  

  const generatePdf = async () => {
    if (!templateRef.current) return;
    const canvas = await html2canvas(templateRef.current);
    const data = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF({
      orientation: 'portrait',
    });
    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    const pdfBlob = pdf.output('blob');
    const blobURL = URL.createObjectURL(pdfBlob);
    setPdfBlobUrl(blobURL);
    setPdfPreviewModalOpen(true); // Open the PDF preview modal
    navigate('/resume/preview', { state: { blobURL } });
  };


  const closeModal = () => setResumeModalOpen(false);

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
              <Grid container direction="row" justifyContent="flex-end">
                {renderTooltip('Enter your email address')}
              </Grid>                  
              {/* Title */}
              <TextField
                variant="filled"
                label="Title"
                name="title"
                value={resume.title}
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
              <Grid container direction="row" justifyContent="flex-end">
                {renderTooltip('Write a brief summary of your professional background')}
              </Grid>
              {/* Phone */}
              <TextField
                variant="filled"
                label="Phone"
                name="phone"
                value={resume.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
              />
              {/*City*/}
              <TextField
                variant="filled"
                label="City"
                name="city"
                value={resume.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
              />
              {/*Country*/}
              <TextField
                variant="filled"
                label="Country"
                name="country"
                value={resume.country}
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
      <StyledModal open={isResumeModalOpen} onClose={closeModal}>
        <Box sx={{alignContent: 'center', alignItems: 'center', marginRight: '500px'}}>
          {/* This Box is what you'll use for generating the PDF */}
          <Box ref={templateRef} sx={{ width: '300%'}}>
            {generatedTemplate}
          </Box>
          {/* The Preview button is outside the content Box */}
          <Button variant='contained' color='primary' onClick={generatePdf} style={{margin: '10px'}}>Preview</Button>
        </Box>
      </StyledModal>
      <StyledModal open={isPdfPreviewModalOpen} onClose={() => setPdfPreviewModalOpen(false)}>
        <Box sx={{ width: '80%', height: '90vh', overflowY: 'auto' }}>
          <iframe src={pdfBlobUrl} width="100%" height="100%" style={{ border: 'none' }} title="PDF Preview"></iframe>
        </Box>
      </StyledModal>
    </Grid>
  );
}
