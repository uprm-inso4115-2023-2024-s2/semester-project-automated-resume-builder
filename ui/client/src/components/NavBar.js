import React, { useState } from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Navbar() {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [resumeMenuAnchorEl, setResumeMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleResumeMenuClick = (event) => {
    setResumeMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenuAnchorEl(null);
    setResumeMenuAnchorEl(null);
  };

  const handleUserMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };

  const handleResumeMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')}>
                <HomeIcon />
              </IconButton>
              <Link to="/" style={{ textDecoration: 'none', color: '#eee' }}>
                Pern stack
              </Link>
            </Typography>

            {/* User Menu */}
            <IconButton color="inherit" aria-label="user" onClick={handleUserMenuClick}>
              <i className="fas fa-solid fa-user"></i>
              User
              <ArrowDropDownIcon />
            </IconButton>
            <Menu anchorEl={userMenuAnchorEl} open={Boolean(userMenuAnchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => handleUserMenuItemClick('users/new')}>New user</MenuItem>
              <MenuItem onClick={() => handleUserMenuItemClick('login')}>Log in</MenuItem>
              <MenuItem onClick={() => handleUserMenuItemClick('signup')}>Sign up</MenuItem>
            </Menu>

            {/* Resume Menu */}
            <IconButton color="inherit" aria-label="resume" onClick={handleResumeMenuClick}>
              Resume
              <ArrowDropDownIcon />
            </IconButton>
            <Menu anchorEl={resumeMenuAnchorEl} open={Boolean(resumeMenuAnchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => handleResumeMenuItemClick('resume/new')}>Resume Template</MenuItem>
              <MenuItem onClick={() => handleResumeMenuItemClick('/resume/datainput')}>Resume Information</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
