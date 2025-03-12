import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";


const getAuthHeader = (state) => {
  const token = state.auth.token;
  if (!token) return {};
  return { headers: { Authorization: `Bearer ${token}` } };
};


export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const response = await axios.get("/contacts", getAuthHeader(state));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const response = await axios.post("/contacts", { name, number }, getAuthHeader(state));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      await axios.delete(`/contacts/${id}`, getAuthHeader(state));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
