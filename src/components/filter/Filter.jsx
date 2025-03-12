import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filterSlice';
import { selectFilter } from '../../redux/selectors';
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onFilterChange = e => dispatch(changeFilter(e.target.value));

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Search Contact"
        variant="outlined"
        value={filter}
        onChange={onFilterChange}
        placeholder="Find contact by name..."
        fullWidth
        sx={{ maxWidth: 400 }}
      />
    </Box>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default Filter;
