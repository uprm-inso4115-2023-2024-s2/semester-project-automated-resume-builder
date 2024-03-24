import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function Navbar() {

    const navigate = useNavigate()
    const { logout, globalUser, setGlobalUser } = useUser();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar>
                        <Typography variant='h6' sx={{ flexGrow: 1 }}>
                            <Link to='/' style={{ textDecoration: 'none', color: '#eee' }}>
                                UPResuMe
                            </Link>
                        </Typography>
                        <Button variant='contained' color='primary' onClick={() => navigate('users/new')} className="navbarButton">
                            New user
                        </Button>
                        <Button variant='contained' color='primary' style={{ marginLeft: '1rem' }} onClick={() => navigate('resume/templates')}>
                            Templates
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => navigate('/resume/datainput')} className="navbarButton">
                            Resume
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => navigate('signup')} className="navbarButton">
                            Sign up
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => navigate('login')} className="navbarButton">
                            Log in
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => navigate('/preview')} className="navbarButton">
                            Preview
                        </Button>
                        <Button variant='contained' color='primary' onClick={logout} className="navbarButton">
                            Cerrar sesion
                        </Button>
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