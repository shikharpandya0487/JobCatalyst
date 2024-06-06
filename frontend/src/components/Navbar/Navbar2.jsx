import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LightModeIcon from '@mui/icons-material/LightMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChatState } from '../../UserContext';
import LoginForm from '../Login-Signup/LoginForm';
import SignupForm from '../Login-Signup/SignupForm';

const theme = createTheme({
  palette: {
    purple: {
      main: '#8656cd',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

// const pages = ['Dues', 'Groups', 'Savings'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({ thememode, toggle, setFlag, flag, isAdmin, setIsAdmin }) {
  const navigate = useNavigate();
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [navuser, setNavuser] = useState({});
  const { setUser } = ChatState();
  // const [open, setOpen] = useState(false);
  const [modalShowlogin, setModalShowlogin] = useState(false);
  const [modalShowSignup, setModalShowSignup] = useState(false);
  const isAuthenticated = localStorage.getItem('token') !== null;
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = user ? user.isAdmin : false;

  console.log("admin check",admin)
  useEffect(() => {
    const check = async () => {
      try {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setNavuser(foundUser);
          await setUser(foundUser);
        }
      } catch (err) {
        console.log(err);
      }
    };
    check();
  }, [user?._id, flag, setUser]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <>
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none', elevation: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src="favicon.ico" style={{ height: "40px" }} alt='' />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => { navigate("/community") }}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'poppins',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: thememode === 'dark' ? 'white' : '#000080',
                textDecoration: 'none',
              }}
            >
              JobCatalyst
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => { navigate("/") }}
                sx={{
                  my: 2,
                  color: thememode === 'dark' ? 'white' : '#000080',
                  display: 'block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#000080',
                    bottom: '-2px',
                    left: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                }}
              >
                Home
              </Button>
              <Button
                onClick={() => { navigate("/community") }}
                sx={{
                  my: 2,
                  color: thememode === 'dark' ? 'white' : '#000080',
                  display: 'block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#000080',
                    bottom: '-4px',
                    left: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                }}
              >
                Community
              </Button>
              <Button
                onClick={() => { navigate("/jobs") }}
                sx={{
                  my: 2,
                  color: thememode === 'dark' ? 'white' : '#000080',
                  display: 'block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#000080',
                    bottom: '-4px',
                    left: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                }}
              >
                Jobs
              </Button>
              <Button
                onClick={() => { navigate("/experiences") }}
                sx={{
                  my: 2,
                  color: thememode === 'dark' ? 'white' : '#000080',
                  display: 'block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#000080',
                    bottom: '-4px',
                    left: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                }}
              >
                Job Experiences
              </Button>
              {
                admin 
                  &&
                  (<Button
                    onClick={() => { navigate("/people") }}
                    sx={{
                      my: 2,
                      color: thememode === 'dark' ? 'white' : '#000080',
                      display: 'block',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#000080',
                        bottom: '-4px',
                        left: 0,
                        transform: 'scaleX(0)',
                        transformOrigin: 'bottom right',
                        transition: 'transform 0.25s ease-out',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                        transformOrigin: 'bottom left',
                      },
                    }}
                  >
                    Search people
                  </Button> 
                  )
              }
              {admin && (<Button
                onClick={() => { navigate("/job-basics") }}
                sx={{
                  my: 2,
                  color: thememode === 'dark' ? 'white' : '#000080',
                  display: 'block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#000080',
                    bottom: '-4px',
                    left: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                }}
              >
                Post A Job
              </Button>)}

              <Button
                onClick={() => { navigate("/chats") }}
                sx={{
                  my: 2,
                  color: thememode === 'dark' ? 'white' : '#000080',
                  display: 'block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#000080',
                    bottom: '-4px',
                    left: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                }}
              >
                Connections
              </Button>
              {!isAuthenticated && (
                <>
                  <Button
                    onClick={() => setModalShowlogin(true)}
                    sx={{
                      my: 2,
                      color: thememode === 'dark' ? 'white' : '#000080',
                      display: 'block',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#000080',
                        bottom: '-4px',
                        left: 0,
                        transform: 'scaleX(0)',
                        transformOrigin: 'bottom right',
                        transition: 'transform 0.25s ease-out',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                        transformOrigin: 'bottom left',
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                   onClick={() => setModalShowSignup(true)}
                    sx={{
                      my: 2,
                      color: thememode === 'dark' ? 'white' : '#000080',
                      display: 'block',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#000080',
                        bottom: '-4px',
                        left: 0,
                        transform: 'scaleX(0)',
                        transformOrigin: 'bottom right',
                        transition: 'transform 0.25s ease-out',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                        transformOrigin: 'bottom left',
                      },
                    }}
                  >
                    SignUp
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <LightModeIcon
                onClick={toggle}
                sx={{
                  color: thememode === 'dark' ? 'white' : 'inherit',
                  cursor: 'pointer'
                }}
              />
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={navuser?.image || 'ProfileImg.jpeg'} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { navigate("/profile") }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => { navigate("/add-post") }}>
                  <Typography textAlign="center">Add Post</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
     
    </ThemeProvider>
     <LoginForm show={modalShowlogin} onHide={() => setModalShowlogin(false)} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
     <SignupForm show={modalShowSignup} onHide={() => setModalShowSignup(false)} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
     </>
  );
}
export default ResponsiveAppBar;
