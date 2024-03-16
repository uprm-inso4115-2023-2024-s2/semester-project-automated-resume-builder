import React, { useState, useRef } from 'react';
import { Grid, Typography, Drawer, List, ListItem, ListItemText, Button, Box, Paper, Link} from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const templateCategories = {
  'Category 1': ['Template 1', 'Template 2'],
  'Category 2': ['Template 3', 'Template 4'],
  // Add more categories and templates as needed
};

export default function ResumeTemplates({ submittedResume }) {
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const templateRef = useRef(null); // Reference for the template to convert into PDF
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
  };

  return (
    <Grid container spacing={0}>
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
              width: '140px', // Adjust the width of the category sidebar
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
      <Grid item xs={2}>
        <Drawer
          anchor="left"
          variant="permanent"
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              marginTop: '64px',
              color: 'white',
              overflow: 'hidden',
              marginLeft: '150px', // Adjust margin to position next to the categories sidebar
            },
          }}
        >
          <List>
            {templateCategories[selectedCategory].map((template) => (
              <ListItem button key={template} onClick={() => generateResume(template)}>
                <ListItemText primary={template} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Grid>
      <Grid item xs={8} style={{ position: 'relative' }}>
        <div ref={templateRef}>
          {/* Display the generated template */}
          {generatedTemplate}
        </div>
        {generatedTemplate && (
          <>
            <Button variant="contained" color="primary" onClick={generatePdf} style={{ margin: '10px' }}>
              Preview
            </Button>
            {pdfUrl && (
              <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} frameBorder="0" title="Resume Preview"></iframe>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}