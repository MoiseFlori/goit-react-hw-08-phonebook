import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Contact Book
        </Typography>
        <Typography variant="h5">
          Manage your contacts easily and securely.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
