import { createAsyncThunk } from '@reduxjs/toolkit';
import { authActions } from './authSlice';
import { globalActions } from 'features/global/globalSlice';
import { signInRequest } from 'api/auth/sign-in';
import { signUpRequest } from 'api/auth/sign-up';

const { setIsLoading } = globalActions;
const { setToken } = authActions;

export const signIn = createAsyncThunk(
  'signIn',
  async ({ login, password }, thunkAPI) => {
    const { dispatch, rejectWithValue, fulfillWithValue } = thunkAPI;
    try {
      dispatch(setIsLoading(true));
      const resp = await signInRequest({ login, password });
      const respData = resp.data;

      dispatch(setToken(respData.accessToken));
      dispatch(setIsLoading(false));

      return fulfillWithValue(respData);
    } catch (err) {
      dispatch(setIsLoading(false));
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'signUp',
  async ({ login, password }, thunkAPI) => {
    const { dispatch, rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      dispatch(setIsLoading(true));
      const resp = await signUpRequest({ login, password });
      const respData = resp.data;

      dispatch(setToken(respData.accessToken));
      dispatch(setIsLoading(false));

      return fulfillWithValue(respData);
    } catch (err) {
      dispatch(setIsLoading(false));

      let errors;
      if (err.response.data.message.errors) {
        errors = err.response.data.message.errors.map((err) => err.msg);
      } else {
        errors = [err.response.data.message];
      }

      return rejectWithValue(errors);
    }
  }
);
