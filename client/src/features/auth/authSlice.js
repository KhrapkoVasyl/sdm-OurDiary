import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './auth.thunk';

const initialState = {
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const selectAuthError = (state) => state.auth.error;

export const useAuthActions = () => {
  const globalActions = useActions(globalSlice.actions);
  return globalActions;
};

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
