import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify styles

const BASE_URL = 'http://localhost:8080'; // Replace with your backend URL

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const credentials = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        console.log('Login successful:', data);
        const userData = { username, loggedIn: true };
        localStorage.setItem('user', JSON.stringify(userData)); // Save username (optional)

        // Display success toast
        toast.success('Login successful!');

        // Redirect to home page or dashboard
        window.location.href = '/home';
      } else {
        // Handle login error (invalid credentials)
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Error during login');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: '5rem' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={4}
            borderRadius={2}
            boxShadow={5}
            bgcolor="background.paper"
            sx={{
              width: '100%', // Increased width for the box
              maxWidth: 600, // Adjust this value to control the maximum width
              '& .MuiFormControl-root': {
                marginBottom: 2, // Spacing between form elements
              },
            }}
          >
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px', // Rounded borders for input
                  },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px', // Rounded borders for input
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 3,
                  padding: '12px 0',
                  fontSize: '16px',
                  borderRadius: '8px', // Rounded button corners
                  boxShadow: 3, // Button shadow
                  '&:hover': {
                    boxShadow: 6, // Button hover effect
                  },
                }}
              >
                Login
              </Button>

              {error && (
                <Alert severity="error" sx={{ marginTop: 2, width: '100%' }}>
                  {error}
                </Alert>
              )}
            </form>
          </Box>
        </Grid>
      </Grid>

      {/* Toast Container to show the toast notifications */}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </Container>
  );
};

export default Login;
