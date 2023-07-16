import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';

import { signupUser, loginUser, logoutUser, fetchCurrentUser, themeToggle } from './authOperations';

const initialState = {
  user: { name: null, email: null, avatarURL: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isThemeToggle: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.errorMessage = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.errorMessage = action.payload.response.data.message;
      })
      .addCase(loginUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.errorMessage = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.errorMessage = action.payload.response.data.message;
      })
      .addCase(logoutUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.errorMessage = null;
      })
      .addCase(fetchCurrentUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.errorMessage = null;
      })
      .addCase(fetchCurrentUser.rejected, state => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.errorMessage = null;
      })
      .addCase(themeToggle.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(themeToggle.fulfilled, (state, action) => {
        state.isRefreshing = false;

        state.isThemeToggle = action.payload.isThemeToggle;
      })
      .addCase(themeToggle.rejected, (state, action) => {
        state.isRefreshing = false;
      })
      .addDefaultCase(state => state);
  },
});

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token', 'isLoggedIn', 'isThemeToggle'],
};

export const authPersistedReducer = persistReducer(persistConfig, authSlice.reducer);
