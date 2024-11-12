import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Container,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  GroupAdd as GroupAddIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useDarkMode } from './DarkModeContext';


// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, #1e1e1e 30%, #2d2d2d 90%)'
    : 'linear-gradient(145deg, #ffffff 30%, #f5f5f5 90%)',
  borderRadius: 16,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0,0,0,0.3)'
    : '0 8px 32px rgba(0,0,0,0.1)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255,255,255,0.1)'
    : '1px solid rgba(0,0,0,0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: '10px 20px',
  textTransform: 'none',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 5px 15px rgba(255,255,255,0.1)'
      : '0 5px 15px rgba(0,0,0,0.1)',
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '& .MuiIconButton-root': {
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  },
  '& .MuiTypography-root': {
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
    borderRight: theme.palette.mode === 'dark'
      ? '1px solid rgba(255,255,255,0.1)'
      : '1px solid rgba(0,0,0,0.1)',
  }
}));

const Home = () => {
  const [username, setUsername] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsername(null);
    navigate('/');
  };

  if (username === null) {
    return null;
  }

  const menuItems = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      onClick: () => navigate('/home'),
    },
    {
      text: 'Employee Management',
      icon: <GroupAddIcon />,
      onClick: () => navigate('/employee'),
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={item.onClick}
            sx={{
              my: 1,
              mx: 2,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.1)' 
                  : 'rgba(0,0,0,0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
      transition: 'background-color 0.3s ease',
    }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backdropFilter: 'blur(20px)',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          borderBottom: theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <StyledToolbar>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 600,
            }}
          >
            Admin Panel
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <StyledButton
                variant="contained"
                color="primary"
                startIcon={<GroupAddIcon />}
                onClick={() => navigate('/employee')}
              >
                Employee Management
              </StyledButton>
              
              <StyledButton
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </StyledButton>
            </Box>
          )}

          <IconButton 
            onClick={toggleDarkMode}
            sx={{ 
              ml: 2,
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(0, 0, 0, 0.2)',
              },
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.2)'
                : '1px solid rgba(0,0,0,0.2)',
            }}
          >
            {darkMode ? 
              <LightModeIcon sx={{ color: '#FDB813' }} /> : 
              <DarkModeIcon sx={{ color: '#757de8' }} />
            }
          </IconButton>
        </StyledToolbar>
      </AppBar>

      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {drawer}
      </StyledDrawer>

      <Container 
        maxWidth="sm" 
        sx={{ 
          mt: 12, 
          mb: 4, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <StyledCard>
          <CardContent sx={{ 
            textAlign: 'center', 
            py: 4,
            px: { xs: 2, sm: 4 },
          }}>
            <PersonIcon sx={{ 
              fontSize: 48, 
              mb: 2, 
              color: theme.palette.primary.main,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.1)' 
                : 'rgba(0,0,0,0.1)',
              padding: 1,
              borderRadius: '50%',
            }} />
            
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '2rem' },
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              Welcome, {username}!
            </Typography>
            
            <Typography 
              variant="body1" 
              paragraph
              sx={{ 
                mb: 4,
                color: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.7)' 
                  : 'rgba(0,0,0,0.7)',
              }}
            >
              You are now logged in to the admin panel.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <StyledButton
                variant="contained"
                color="primary"
                size="large"
                startIcon={<GroupAddIcon />}
                onClick={() => navigate('/employee')}
                fullWidth
              >
                Go to Employee Management
              </StyledButton>
              
              <StyledButton
                variant="outlined"
                color="inherit"
                size="large"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                fullWidth
              >
                Home
              </StyledButton>
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default Home;