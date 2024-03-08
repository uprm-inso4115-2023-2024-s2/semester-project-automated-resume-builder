import React from 'react';
import { Box, Grid, Paper, Button, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import SaveIcon from '@mui/icons-material/Save';
import HomeIcon from '@mui/icons-material/Home';
import './PreviewPage.css';
import { useNavigate } from 'react-router-dom';

export default function PreviewPage() {
    const navigate = useNavigate();

    const handleShare = () => {
        console.log('Compartir presionado');
      };
    
      const handleDownload = () => {
        console.log('Descargar presionado');
      };
    
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
            <div id="pdf-viewer">
                {/* La implementación de la visualización del PDF iría aquí */}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" component="h2" className="title">
            Share & Export Your Resume!
          </Typography>
          <Box className="buttons-row">
            <Button className="custom-button" startIcon={<ShareIcon />} onClick={handleShare}>Share</Button>
            <Button className="custom-button" startIcon={<DownloadIcon />} onClick={handleDownload}>Download</Button>
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
