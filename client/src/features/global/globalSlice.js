import { createSlice } from '@reduxjs/toolkit';
import { useActions } from 'hooks/useActions';
import { POPUP_MODES } from 'constants/popup-modes';

const initialState = {
  isPopupOpen: false,
  popupMode: POPUP_MODES.EDIT,
  isLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsPopupOpen: (state, action) => {
      state.isPopupOpen = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPopupMode: (state, action) => {
      state.popupMode = action.payload;
    },
  },
});

export const useGlobalActions = () => {
  const globalActions = useActions(globalSlice.actions);
  return globalActions;
};

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
