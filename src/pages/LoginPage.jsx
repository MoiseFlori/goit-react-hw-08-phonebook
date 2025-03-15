import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/auth/operations';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    if (!userData.email || !userData.password) {
      setError('All fields are required!');
      setIsSubmitting(false);
      return;
    }

    const resultAction = await dispatch(loginUser(userData));

    if (loginUser.rejected.match(resultAction)) {
      setError(
        resultAction.payload || 'Invalid email or password. Please try again.'
      );
      setIsSubmitting(false);
    } else {
      setError('');
    }
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

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
