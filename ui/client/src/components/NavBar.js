import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './LandingPage.css';

export default function Navbar() {

    const navigate = useNavigate()
    const { logout, globalUser, setGlobalUser } = useUser();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar>
                        <Link to='/' className="link">
                        <div className="title-container">
                                <span role="img" aria-label="paw-print" className="paw-print">🐾</span> {/* Paw print Unicode character */}
                                <h1 className='upresume-title'>UPResuMe</h1>
                            </div>
                        </Link>
                        <div className='profile-button-container'>
                        <Link to='/profile' className='link'>
                                <div className='profile-picture'></div>
                            </Link>
                        </div>
                        <div className='top-buttons-group'>
                            <Link to='/resume/templates' className='link'>
                                <button className='top-button'>Templates</button>
                            </Link>
                            <Link to='/resume/datainput' className='link'>
                                <button className='top-button'>Resume</button>
                            </Link>
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
        </Box>
    )
}