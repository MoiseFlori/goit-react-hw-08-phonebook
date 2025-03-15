import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', userData);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      if (error.response?.data?.code === 11000) {
        return thunkAPI.rejectWithValue(
          'This email is already registered. Please log in.'
        );
      }

      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', userData);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        return thunkAPI.rejectWithValue(
          'Incorrect email or password. Please try again.'
        );
      }
      if (error.response?.status === 500) {
        return thunkAPI.rejectWithValue(
          'Server error. Please try again later.'
        );
      }

      return thunkAPI.rejectWithValue(
        error.response?.data || 'An unexpected error occurred.'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token || token === 'null' || token === '') {
      return thunkAPI.rejectWithValue('No valid token found');
    }

    try {
      setAuthHeader(token);
      const response = await axios.get('/users/current');
      return { user: response.data, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
