import React from 'react';
import styles from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors'; 
import PropTypes from 'prop-types'

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts); 

  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phoneNumber = form.phoneNumber.value.trim();

   
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

   
    dispatch(addContact({name, phoneNumber}));
    form.reset();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        <span className={styles.labelText}>Name</span>
        <input
          className={styles.input}
          type="text"
          name="name"
          pattern="^[a-zA-Z]+((['\- ][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
        />
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>Number</span>
        <input
          className={styles.input}
          type="tel"
          name="phoneNumber"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={styles.addButton}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
