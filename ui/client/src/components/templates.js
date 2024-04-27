import React, { useState, useRef, useEffect } from 'react';
import {Grid, Typography, Button, Box, Paper, Card, CardActionArea, CardContent, Drawer, List, ListItem, ListItemText, Modal, styled, CardMedia} from '@mui/material';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import template1Image from '../chrono.png';
import template2Image from '../combination.png'
import template3Image from '../targeted.png'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';  // This is the icon for three vertical dots
import './LandingPage.css';

const templateCategories = {
  'Category 1': [
    { name: 'Chronological Template', imagePath: template1Image, description: 'A chronological template orders your resume based on the most recent work experience.' },
    { name: 'Hybrid Template', imagePath: template2Image, description: 'A hybrid resume template is based on the skills and qualifications first, followed by employment history.' },
    { name: 'Targeted Template', imagePath: template3Image, description: 'A targeted resume is tailored for a specific job position.' },
  ],
  'Category 2': [
    { name: 'Chronological Template', imagePath: template1Image, description: 'A chronological template orders your resume based on the most recent work experience.' },
    { name: 'Targeted Template', imagePath: template3Image, description: 'A targeted resume is tailored for a specific job position.' },
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Initially true if you want it open by default

 

  let [bgColor, setBgColor] = useState();
  let font = "Arial"
 


  const generateResumeTemp = (templateName) => {
    // Find the selected template by its name
    const selectedTemplate = Object.values(templateCategories).flat().find(template => template.name === templateName);
    if (!selectedTemplate) return; // Template not found, you could handle this error as needed

    // Generate content to display the full image of the selected template
    const content = (
      <Box sx={{ display:'grid', gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20, textAlign: 'center' }}>
        <div id="Preview">
        <img src={selectedTemplate.imagePath} alt={`Template ${templateName}`} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        </div>
        
        <div id="Options" sx={{display:'grid'}}>
        <Button variant="contained" color="primary"  onClick={() => navigate(`/resume/new`, { state: { templateName: templateName , bgColor: bgColor } })} style={{ marginTop: '20px', gridColumnStart: 2, placeSelf: 'center',maxHeight: '5em',maxWidth: '10em'}}>
          Use This Template
        </Button>

        <fieldset id="BackgroundColorSelector" style={{ marginTop: '20px', gridColumnStart: 2, gridRowStart: 1, backgroundColor:"blue"}}>
        <input name="bg" onClick={()=>setBgColor("white")} type="radio" id="white" checked="checked"/><label for="white">White</label>
        <input name="bg" onClick={()=>setBgColor("linen")} type="radio" id="linen"/><label for="linen">Linen</label>
        <input name="bg" onClick={()=>setBgColor("alice blue")} type="radio" id="alice blue"/><label for="alice blue">Alice Blue</label>
        <input name="bg" onClick={()=>setBgColor("red")} type="radio"/><label for="alice blue">Alice Blue</label>
        
        </fieldset>
        <fieldset id="FontSelection" style={{ marginTop: '20px', gridColumnStart: 2, gridRowStart: 1, backgroundColor:"blue"}}>
        <input name="font" onClick={()=>font="arial"} type="radio" id="arial" checked="defaultChecked"/><label for="arial">Arial</label>
        <input name="font" onClick={()=>font="roboto"} type="radio" id="roboto"/><label for="Roboto">Roboto</label>
        <input name="font" onClick={()=>font="helvetica"} type="radio" id="helvetica"/><label for="helvetica">Helvetica</label>        
        </fieldset> 
        </div>
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
    <Grid container spacing={2} className='container'>
      <Link to="/profile" className='link'>
          <div className='profile-picture'></div>
      </Link>
      <Grid item xs={2}>
          <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)} style={{ color: 'white', marginBottom: 20, position: 'fixed', left: isDrawerOpen ? 120 : 0, top: 60, transition: 'left 0.3s ease' }}>
            <MoreVertIcon style={{ fontSize: '60px' }}/>
          </IconButton>
          <Drawer
              anchor="left"
              open={isDrawerOpen} // Controlled by state
              onClose={() => setIsDrawerOpen(false)} // Close when clicking outside the drawer
              variant={isDrawerOpen ? "persistent" : "temporary"}
              PaperProps={{
                  style: {
                      backgroundColor: 'rgba(255, 255, 255, 0.20)',
                      marginTop: '64px',
                      color: 'white',
                      overflow: 'hidden',
                  },
              }}>
              <List>
                  {Object.keys(templateCategories).map((category) => (
                      <ListItem button key={category} onClick={() => {
                          setSelectedCategory(category);
                          setIsDrawerOpen(false); // Optionally close drawer when a category is selected
                      }}
                      sx={{
                          backgroundColor: selectedCategory === category ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                          '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              cursor: 'pointer'
                            },
                            transition: 'background-color 0.3s ease' // Smooth transition for hover effect
                      }}>
                          <ListItemText primary={<Typography variant="h6" style={{ color: 'white' }}>{category}</Typography>} />
                      </ListItem>
                  ))}
              </List>
            </Drawer>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '20px', marginLeft: isDrawerOpen ? 120 : 0 }}>
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
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {/* Here you can add the actual description for each template */}
                      {template.description || 'No description available.'}
                    </Typography>
                  </CardContent>
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
            {/* Add the Back button here */}
            <Button 
              variant="contained" 
              onClick={handleResumeModalClose} 
              style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Back
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