import React from 'react';
import styles from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { selectFilteredContacts } from '../../redux/selectors';
import PropTypes from 'prop-types'

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const handleDelete = (id) => dispatch(deleteContact(id));

  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <li className={styles.contactItem} key={contact.id}>
          {contact.name}: {contact.phoneNumber}
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  ),
};
export default ContactList;
