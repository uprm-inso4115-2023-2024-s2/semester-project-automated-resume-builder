import React, { useState, useRef } from 'react';
import {Grid, Typography, Button, Box, Paper, Link, Card, CardActionArea, Drawer, List, ListItem, ListItemText, Modal, styled, CardMedia} from '@mui/material';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
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
  backgroundColor: 'beige',
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
  const navigate = useNavigate();


  const generateResumeTemp = (templateName) => {
    // Find the selected template by its name
    const selectedTemplate = Object.values(templateCategories).flat().find(template => template.name === templateName);
    if (!selectedTemplate) return; // Template not found, you could handle this error as needed

    // Generate content to display the full image of the selected template
    const content = (
      <Box sx={{ textAlign: 'center' }}>
        <img src={selectedTemplate.imagePath} alt={`Template ${templateName}`} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        <Button variant="contained" color="primary"  onClick={() => navigate(`/resume/new`, { state: { templateName: templateName } })} style={{ marginTop: '20px' }}>
          Use This Template
        </Button>
      </Box>
    );

    setGeneratedTemplate(content);
    setResumeModalOpen(true);
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
                <CardActionArea onClick={() => generateResumeTemp(template.name)}>
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