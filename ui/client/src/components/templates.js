import React, { useState, useRef } from 'react';
import { Grid, Typography, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumeTemplates({ submittedResume }) {
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const templateRef = useRef(null); // Reference for the template to convert into PDF

  const generateResume = (templateType) => {
    let content = null;
    switch (templateType) {
      case 'Template 1':
        content = (
          <div>
            <Typography variant="h6">Template 1</Typography>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: 'white', color: 'black' }}>
              <Typography variant="subtitle1">Name: {submittedResume.name}</Typography>
              <Typography variant="subtitle1">Email: {submittedResume.email}</Typography>
              <Typography variant="subtitle1">Summary: {submittedResume.summary}</Typography>
              {/* Additional fields for Template 1 */}
            </div>
          </div>
        );
        break;
      case 'Template 2':
        content = (
          <div>
            <Typography variant="h6">Template 2</Typography>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: 'white', color: 'black' }}>
              <Typography variant="subtitle1">Name: {submittedResume.name}</Typography>
              <Typography variant="subtitle1">Email: {submittedResume.email}</Typography>
              {/* Custom fields for Template 2 */}
            </div>
          </div>
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
      <Grid item xs={3}>
        <Drawer
          anchor="left"
          variant="permanent"
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              marginTop: '64px',
              color: 'white',
              overflow: 'hidden',
            },
          }}
        >
          <List>
            <ListItem button onClick={() => generateResume('Template 1')}>
              <ListItemText primary="Template 1" />
            </ListItem>
            <ListItem button onClick={() => generateResume('Template 2')}>
              <ListItemText primary="Template 2" />
            </ListItem>
            {/* List other templates as needed */}
          </List>
        </Drawer>
      </Grid>
      <Grid item xs={9} style={{ position: 'relative' }}>
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