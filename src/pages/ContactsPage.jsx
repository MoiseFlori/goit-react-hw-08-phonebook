import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/operations';
import {
  selectContacts,
  selectIsLoading,
  selectError,
} from '../redux/selectors';
import ContactForm from '../components/contactForm/ContactForm';
import ContactList from '../components/contactList/ContactList';
import Filter from '../components/filter/Filter';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={3}
      sx={{ mt: 3, px: 2 }}
    >
      <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Add New Contact
        </Typography>
        <ContactForm />
      </Paper>

      <Paper sx={{ p: 3, flex: 2 }} elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Contacts
        </Typography>

        {contacts.length > 0 && <Filter />}
        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" align="center" mt={2}>
            Error: {error}
          </Typography>
        )}
        <ContactList />
      </Paper>
    </Box>
  );
};

export default ContactsPage;
