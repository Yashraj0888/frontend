// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import EmployeeDetails from './Components/EmployeeDetails';
import EmpoloyeeManagmantApp from './Components/EmpoloyeeManagmantApp';
import Login from './Components/Login';
import Home from './Components/Home';
import PrivateRoute from './Components/PrivateRoute';
import { DarkModeProvider, useDarkMode } from './Components/DarkmodeContext';

const AppContent = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Dark mode button container */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000
        }}>
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton 
              onClick={toggleDarkMode}
              sx={{
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.3s ease',
                color: darkMode ? '#FDB813' : '#757de8' // Gold color for sun, blue for moon
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </div>
        
        {/* Main content container */}
        <div style={{ padding: '10px', color: theme.palette.text.primary }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee"
                element={
                  <PrivateRoute>
                    <EmpoloyeeManagmantApp />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/:id"
                element={
                  <PrivateRoute>
                    <EmployeeDetails />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </ThemeProvider>
  );
};

const App = () => (
  <DarkModeProvider>
    <AppContent />
  </DarkModeProvider>
);

export default App;