import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom';

export default function Navbar(){
    
  const navigate = useNavigate()

    return (
      <Box sx={{flexGrow: 1}}>
        <AppBar position='static' color='transparent'>
            <Container>
                <Toolbar>
                    <Typography variant='h6' sx={{flexGrow: 1}}>
                        <Link to='/' style={{textDecoration:'none', color: '#eee'}}>
                        Pern stack
                        </Link>
                    </Typography>
                    <Button variant='contained' color='primary' onClick={() => navigate('users/new')} className="navbarButton">
                        New user
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => navigate('resume/new')}>
                        Resume Template
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => navigate('signup')} className="navbarButton">
                        Sign up
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => navigate('login')} className="navbarButton">
                        Log in
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => navigate('/resume/datainput')} className="navbarButton">
                        Resume Information
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => navigate('/preview')} className="navbarButton">
                        Preview
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
      </Box>
    )
  }