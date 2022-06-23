import { createSlice } from '@reduxjs/toolkit';
import { useActions } from 'hooks/useActions';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export const useTasksActions = () => {
  const tasksActions = useActions(tasksSlice.actions);
  return tasksActions;
};

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
