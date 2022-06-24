import { createAsyncThunk } from '@reduxjs/toolkit';
import { authActions } from './authSlice';
import { globalActions } from 'features/global/globalSlice';

export const signIn = createAsyncThunk(
  'signIn',
  async ({ login, password }, thunkAPI) => {
    const { setIsLoading } = globalActions;
    const { setToken } = authActions;
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
      setIsLoading(false);
      return rejectWithValue(err.message);
    }
  }
);
