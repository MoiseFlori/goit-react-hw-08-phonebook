import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/auth/authSlice';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    if (!userData.email || !userData.password) {
      alert('Toate câmpurile sunt obligatorii!');
      return;
    }

    dispatch(loginUser(userData));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
