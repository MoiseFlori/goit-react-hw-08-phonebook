import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filterSlice';
import styles from './Filter.module.css';
import { selectFilter } from '../../redux/selectors';
import PropTypes from 'prop-types';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onFilterChange = e => dispatch(changeFilter(e.target.value));

  return (
    <input
      type="text"
      className={styles.input}
      value={filter}
      onChange={onFilterChange}
      placeholder="Find contact by name ..."
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default Filter;
