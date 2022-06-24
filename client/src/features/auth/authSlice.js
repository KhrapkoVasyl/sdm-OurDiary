import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './auth.thunk';

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
export const selectIsAuth = (state) => state.auth.isAuth;

export const useAuthActions = () => {
  const globalActions = useActions(globalSlice.actions);
  return globalActions;
};

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
