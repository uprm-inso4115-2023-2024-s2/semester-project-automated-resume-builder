import React, { useState, useRef } from 'react';
import {Grid, Typography, Button, Box, Paper, Link, Card, CardActionArea, Drawer, List, ListItem, ListItemText, Modal, styled, CardMedia} from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import template1Image from '../chrono.png';
import template2Image from '../combination.png'
import template3Image from '../targeted.png'

const templateCategories = {
  'Category 1': [
    { name: 'Template 1', imagePath: template1Image }, // Adjust the path as necessary
    { name: 'Template 2', imagePath: template2Image },
    { name: 'Template 3', imagePath: template3Image },
  ],
  'Category 2': [
    { name: 'Template 3', imagePath: 'ui/client/public/chrono.png' },
    { name: 'Template 4', imagePath: 'ui/client/public/chrono.png' }
  ],
  // Add more categories and templates as needed
};

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ResumePreview = styled(Box)({
  position: 'absolute',
  width: '80vw', // Make the pop-up 80% of the viewport width
  maxWidth: '1000px', // Optional: You can also set a maximum width
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
  outline: 'none', // Remove the focus outline for aesthetics
});

export default function ResumeTemplates({ submittedResume }) {
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const templateRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('Category 1');



  const generateResume = (templateType) => {
    let content = null;
    switch (templateType) {
      case 'Template 1':
        content = (
          <Box sx={{ padding: '20px', backgroundColor: 'white', color: 'black', fontFamily: 'Arial', fontSize: '14px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '3px' }}>{submittedResume.name}</Typography>
          <Typography variant="h6" sx={{ fontSize: '15px' }}>{submittedResume.title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Typography variant="subtitle1">{submittedResume.phone}</Typography>
            <Typography variant="subtitle1">{submittedResume.email}</Typography>
            <Typography variant="subtitle1">{submittedResume.city}, {submittedResume.country}</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', borderBottom :  'solid'}}>SUMMARY</Typography>
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>{submittedResume.summary}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', borderBottom :  'solid' }}>PROFESSIONAL EXPERIENCE</Typography>
          {/* Map through experiences if it's an array or just display if it's a single string */}
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>{submittedResume.experience}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', borderBottom :  'solid' }}>TECHNICAL SKILLS</Typography>
          {/* Map through skills if they are an array or just display if it's a single string */}
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>{submittedResume.skills}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', borderBottom :  'solid' }}>EDUCATION</Typography>
          {/* Map through education if it's an array or just display if it's a single string */}
          <Typography variant="body1">{submittedResume.education}</Typography>
        </Box>
        );
        break;
      case 'Template 2':
        content = (
          <Paper elevation={3} sx={{ padding: '20px', backgroundColor: 'white', color: 'black', fontFamily: 'Roboto, Arial, sans-serif' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>{submittedResume.name}</Typography>
          <Typography variant="h6" sx={{ color: '#18A558' }}>{submittedResume.title}</Typography>
          <Box sx={{ my: 2 }}>
            <Link href={`mailto:${submittedResume.email}`} sx={{ display: 'block', color: '#34495E', textDecoration: 'none' }}>
              {submittedResume.email}
            </Link>
            <Link href={`tel:${submittedResume.phone}`} sx={{ display: 'block', color: '#34495E', textDecoration: 'none' }}>
              {submittedResume.phone}
            </Link>
            <Typography variant="body1" sx={{ color: '#34495E' }}>{submittedResume.city}</Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#34495E', mb: 2 }}>
            {submittedResume.summary}
          </Typography>
          {/* Here you'd map over submittedResume.experience, submittedResume.education, etc. */}
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
    </Paper>
        );
        break;
      default:
        content = null;
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
    setPdfUrl(URL.createObjectURL(pdfBlob));
    setPdfModalOpen(true); // Open the PDF modal after generating the PDF
  };

  const handleResumeModalClose = () => setResumeModalOpen(false);
  const handlePdfModalClose = () => setPdfModalOpen(false);


  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Drawer
          anchor="left"
          variant="permanent"
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              marginTop: '64px',
              color: 'white',
              overflow: 'auto',
              width: '140px',
            },
          }}
        >
          <List>
            {Object.keys(templateCategories).map((category) => (
              <ListItem button key={category} onClick={() => setSelectedCategory(category)}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          {templateCategories[selectedCategory].map((template) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={template.name}> {/* Adjusted for larger items */}
              <Card>
                <CardActionArea onClick={() => generateResume(template.name)}>
                  <CardMedia
                    component="img"
                    image={template.imagePath}
                    alt={`Template image for ${template.name}`}
                    sx={{ objectFit: 'cover', objectPosition: 'top', height: 280 }} // Set height to your preference
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {generatedTemplate && (
        <StyledModal
          open={resumeModalOpen}
          onClose={handleResumeModalClose}
          aria-labelledby="resume-preview-title"
          aria-describedby="resume-preview-description"
        >
          <ResumePreview>
            <div ref={templateRef}>
              {generatedTemplate}
            </div>
            <Button variant="contained" color="primary" onClick={generatePdf} style={{ margin: '10px' }}>
              Preview PDF
            </Button>
          </ResumePreview>
        </StyledModal>
      )}

      <StyledModal
        open={pdfModalOpen}
        onClose={handlePdfModalClose}
        aria-labelledby="pdf-preview-title"
        aria-describedby="pdf-preview-description"
      >
        <ResumePreview>
          {pdfUrl && (
            <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} frameBorder="0" title="PDF Preview"></iframe>
          )}
        </ResumePreview>
      </StyledModal>
    </Grid>
  );
}