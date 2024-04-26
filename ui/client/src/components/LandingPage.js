import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from '@mui/material';
import './LandingPage.css';

function LandingPage() {
    const [started, setStarted] = useState(false);
    const [open, setOpen] = useState(false);
    const handleGetStarted = () => {
        setStarted(true);
    }

    const handleClose = () => {
        setOpen(false); // Handler to close the dialog
    };

    return (
        <Box className='container'> {/* Apply custom styles to the container */}
            <Link to="/profile" className='link'>
                <div className='profile-picture'></div>
            </Link>
            <h1 className='welcome'>
                <p>Resumes got you crazy?</p>
                <p>Can't find the right color?</p>
                <p>Need help picking the right template?</p>
            </h1>
            {/*diplaing resume images*/}
            <div className='resume-images'>
                <img src="/resume1.png" alt='resume1' />
                <img src='/resume2.png' alt='resume2' />
            </div>
            {!started && (
                <div className='button-container'>
                    {/* Apply custom styles to the Link */}
                    <Link to="/resume/templates" onClick={handleGetStarted} className='link'>
                        <button className='button'>Start your resume today!</button>
                    </Link>
                </div>
            )}
            {started && (
                <p>You have already started!</p>
            )}
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
    );
}



export default LandingPage;
