import React from 'react';
import { Box, Grid, Paper, Button, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import SaveIcon from '@mui/icons-material/Save';
import HomeIcon from '@mui/icons-material/Home';
import './PreviewPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Share from "./Share.tsx"

export default function PreviewPage() {
    const navigate = useNavigate();

    const location = useLocation();
    const blobURL = location.state?.blobURL;

    const handleShare = async (id) => {
        console.log('Compartir presionado');
      };

      const handleDownload = async (id) => {
        console.log('Descargar presionado');
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}/dummyResumen/download` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async res => {
          if (res.status === 200) {
            const blob = await res.blob();
            const file = new Blob(
              [blob], 
              {type: 'application/pdf'}
            );
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);  
          }
        })
        
    }
    
      const handleCopyLink = () => {
        console.log('Copiar Enlace presionado');
      };
    
      const handleSave = () => {
        console.log('Guardar presionado');
      };

      const handleMainMenu = () => {
        navigate('/');
      };


  return (
    <Box className="resume-preview-container">

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} className="pdf-preview-placeholder">
            {/* WHY IS THIS IFRAME ONLY HALF WAY FFS 
            TODO FIX THIS */}
            <iframe src={blobURL} title="resume-preview" width="100%" height="100%" type="application/pdf"></iframe>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" component="h2" className="title">
            Share & Export Your Resume!
          </Typography>
          <Box className="buttons-row">
            <Share description={"check out my resume! http://localhost:4000/users/"+82+"/dummyResumen/download"}/>
            <Button className="custom-button" startIcon={<DownloadIcon />} onClick={(e) => handleDownload(82)}>Download</Button>
            <Button className="custom-button" startIcon={<LinkIcon />} onClick={handleCopyLink}>Copy Link</Button>
          </Box>
          <Box className="button-single">
            <Button className="custom-button" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
          </Box>
          <Box className="homepage-button">
            <Button onClick={handleMainMenu} className='custom-button' startIcon={<HomeIcon/>}>Back to Homepage</Button>
          </Box>
        </Grid>
          
      </Grid>

    </Box>
  );
}
