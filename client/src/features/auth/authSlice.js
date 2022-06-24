import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from './auth.thunk';
import { useActions } from 'hooks/useActions';

const initialState = {
  token: null,
  error: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      state.isAuth = true;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(signUp.pending, (state) => {
      state.error = null;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const selectAuthError = (state) => state.auth.error;
export const selectIsAuth = (state) => state.auth.isAuth;

export const useAuthActions = () => {
  const authActions = useActions(authSlice.actions);
  return authActions;
};

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
