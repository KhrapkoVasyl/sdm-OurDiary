import { createAsyncThunk } from '@reduxjs/toolkit';
import { authActions } from './authSlice';
import { globalActions } from 'features/global/globalSlice';

const { setIsLoading } = globalActions;
const { setToken } = authActions;

export const signIn = createAsyncThunk(
  'signIn',
  async ({ login, password }, thunkAPI) => {
    const { dispatch, rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      dispatch(setIsLoading(true));
      const resp = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const respData = await resp.json();

      if (!resp.ok) {
        console.log(respData.message);
        throw new Error(respData.message);
      }

      dispatch(setToken(respData.accessToken));
      dispatch(setIsLoading(false));

      return fulfillWithValue(respData);
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log('from catch');
      return rejectWithValue(err.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'signUp',
  async ({ login, password }, thunkAPI) => {
    const { dispatch, rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      dispatch(setIsLoading(true));
      const resp = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const respData = await resp.json();

      if (!resp.ok) {
        let errors;
        if (respData.message.errors) {
          errors = respData.message.errors.map((err) => err.msg);
        } else {
          errors = [respData.message];
        }
        throw new Error(errors);
      }

      dispatch(setToken(respData.accessToken));
      dispatch(setIsLoading(false));

      return fulfillWithValue(respData);
    } catch (err) {
      dispatch(setIsLoading(false));
      return rejectWithValue(err.message);
    }
  }
);
