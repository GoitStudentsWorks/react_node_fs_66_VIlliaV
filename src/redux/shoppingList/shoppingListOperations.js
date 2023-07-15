import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://final-project-utf-8-backend.onrender.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// get current shopping list
export const shoppingListGet = createAsyncThunk('shopping/get', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { token } = state.auth;
  if (token === null) {
    return thunkAPI.rejectWithValue();
  }
  setAuthHeader(token);

  try {
    const response = await axios.get('/shopping-list');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// add to shopping list
export const shoppingListAdd = createAsyncThunk('shopping/add', async (newIngredient, thunkAPI) => {
  const state = thunkAPI.getState();
  const { token } = state.auth;
  if (token === null) {
    return thunkAPI.rejectWithValue();
  }
  setAuthHeader(token);

  try {
    const response = await axios.post(`/shopping-list`, newIngredient);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// remove from shopping list
export const shoppingListRemove = createAsyncThunk('shopping/remove', async (idIngredient, thunkAPI) => {
  const state = thunkAPI.getState();
  const { token } = state.auth;
  if (token === null) {
    return thunkAPI.rejectWithValue();
  }
  setAuthHeader(token);

  try {
    const response = await axios.patch(`/shopping-list${idIngredient}`);
    shoppingListGet(); // repeat get from DB
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
