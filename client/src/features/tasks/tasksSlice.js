import { createSlice } from '@reduxjs/toolkit';
import { useActions } from 'hooks/useActions';
import { globalActions } from 'features/global/globalSlice';
import { formatDateToISO } from 'utils/fortmatDateToISO';

const initialState = {
  tasks: [],
  taskToEdit: null,
};

const findTaskIndexById = (tasks, id) => {
  return tasks.findIndex((task) => task.id === id);
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    addTask: (state, { payload }) => {
      state.tasks.unshift(payload);
    },
    deleteTask: (state, { payload: id }) => {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    toggleTask: (state, { payload }) => {
      const { id } = payload;
      const taskIndex = findTaskIndexById(state.tasks, id);
      const task = state.tasks[taskIndex];
      const isDone = task.isDone;
      const doneDate = formatDateToISO(new Date().toString());
      state.tasks[taskIndex] = { ...task, isDone: !isDone, doneDate };
    },
    updateTask: (state, { payload }) => {
      const { id, editedTask } = payload;
      const taskIndex = findTaskIndexById(state.tasks, id);
      state.tasks[taskIndex] = editedTask;
      state.taskToEdit = null;
    },
    setTaskToEdit: (state, { payload: id }) => {
      const taskIndex = findTaskIndexById(state.tasks, id);
      state.taskToEdit = state.tasks[taskIndex];
    },
    removeAllTasks: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(globalActions.setIsPopupOpen, (state, { payload }) => {
      if (payload !== false) return state;
      state.taskToEdit = null;
    });
  },
});

export const selectTasks = (state) => state.tasks.tasks;
export const selectTaskToEdit = (state) => state.tasks.taskToEdit;

export const useTasksActions = () => {
  const tasksActions = useActions(tasksSlice.actions);
  return tasksActions;
};

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
