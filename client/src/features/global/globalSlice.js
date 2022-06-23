import { createSlice } from '@reduxjs/toolkit';
import { useActions } from 'hooks/useActions';
import { TASK_FORM_MODES } from 'constants/popup-modes';

const initialState = {
  isPopupOpen: false,
  taskFormMode: TASK_FORM_MODES.CREATE,
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
    setTaskFormMode: (state, action) => {
      state.taskFormMode = action.payload;
    },
  },
});

export const useGlobalActions = () => {
  const globalActions = useActions(globalSlice.actions);
  return globalActions;
};

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
