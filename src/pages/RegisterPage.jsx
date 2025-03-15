import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/auth/operations';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  Link,
} from '@mui/material';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    const { name, email, password } = userData;
    const isValid =
      name.trim() !== '' && email.trim() !== '' && password.length >= 6;
    setIsFormValid(isValid);
  }, [userData]);

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const resultAction = dispatch(registerUser(userData));

    if (registerUser.rejected.match(resultAction)) {
      setError(
        resultAction.payload || 'Registration failed. Please try again.'
      );
    } else {
      setError('');
    }

    setIsSubmitting(false);
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

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
            {error.includes('already registered') && (
              <>
      
                <Link href="/login" sx={{ fontWeight: 'bold' }}>
                  Go to Login
                </Link>
              </>
            )}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            required
            value={userData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
            value={userData.password}
            onChange={handleChange}
            helperText={
              userData.password.length < 6
                ? 'Password must be at least 6 characters long.'
                : ''
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
