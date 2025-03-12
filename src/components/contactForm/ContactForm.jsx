import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';
import PropTypes from 'prop-types';
import { TextField, Button, Paper, Box } from '@mui/material';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const number = form.number.value.trim(); 


    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number })); 
    form.reset();
  };

  return (
    <Paper
      sx={{ mt: 3, p: 3, maxWidth: 400, height: 'fit-content', mx: 'auto' }}
      elevation={3}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          type="text"
          pattern="^[a-zA-Z]+((['\- ][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="number"
          type="tel"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Contact
        </Button>
      </Box>
    </Paper>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
