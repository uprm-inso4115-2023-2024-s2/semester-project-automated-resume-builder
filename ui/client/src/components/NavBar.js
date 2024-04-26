import { AppBar, Box, Button, Container, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './LandingPage.css';
import React, { useState } from 'react';

export default function Navbar() {

    const navigate = useNavigate()
    const { logout, globalUser, setGlobalUser } = useUser();
    const [open, setOpen] = useState(false);

    const handleClickHelpButton = () => {
        navigate('/faq'); // Redirect to the FAQ page
    };

    const handleClose = () => {
        setOpen(false); // Handler to close the dialog
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar>
                        <Link to='/' className="link">
                            <h1 className='upresume-title'>UPResuMe</h1>
                        </Link>
                        <div className='top-buttons-group'>
                            <Link to='/resume/templates' className='link'>
                                <button className='top-button'>Templates</button>
                            </Link>
                            <Link to='/resume/datainput' className='link'>
                                <button className='top-button'>Resume</button>
                            </Link>
                            <button onClick={handleClickHelpButton} className='top-button'>Help</button>
                        </div>
                        {/* Comprobamos si globalUser y globalUser.name están definidos y no son cadenas vacías */}
                        {globalUser.name !== "" ? (
                            <a>Hola {globalUser.name}</a> // Mostrar el nombre del usuario
                        ) : (
                            <a></a>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{"How to create a Resume?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: 'black' }}>
                        1. Click on the 'Templates' button.<br></br><br></br>
                        2. Choose the template that you prefered and click on it. An example resume of the template
                        will appear. If you are convinced with the template click on 'USE THIS TEMPLATE'.<br></br><br></br>
                        3. Fill in your information into the corresponding fields and click 'SUBMIT RESUME' when you are done.
                        Then a 'Preview' button will appear, click on it.<br></br><br></br>
                        4. A preview of your resume will appear. If everything seems to be in the right place, you can download
                        it into a pdf, save it into your profile or share it using a link.<br></br><br></br>
                        If you need any assistance or have questions about the process,
                        click on the 'Help' button or contact us directly.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>

    )
}