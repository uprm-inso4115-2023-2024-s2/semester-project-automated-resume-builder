import React from 'react';
import { Box, Grid, Paper, Button, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import SaveIcon from '@mui/icons-material/Save';
import './PreviewPage.css';

export default function PreviewPage() {

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
            <Button className="custom-button" startIcon={<ShareIcon />} onClick={handleShare}>Compartir</Button>
            <Button className="custom-button" startIcon={<DownloadIcon />} onClick={handleDownload}>Descargar</Button>
            <Button className="custom-button" startIcon={<LinkIcon />} onClick={handleCopyLink}>Copiar Enlace</Button>
          </Box>
          <Box className="button-single">
            <Button className="custom-button" startIcon={<SaveIcon />} onClick={handleSave}>Guardar</Button>
          </Box>
        </Grid>
      </Grid>

    </Box>
  );
}
