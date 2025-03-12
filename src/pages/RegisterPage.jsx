import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/auth/operations';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleRegister = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    if (!userData.name || !userData.email || !userData.password) {
      alert('Toate câmpurile sunt obligatorii!');
      return;
    }

    dispatch(registerUser(userData));
    formData.reset();
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            required
          />
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
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
