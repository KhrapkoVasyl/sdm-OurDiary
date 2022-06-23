import { createSlice } from '@reduxjs/toolkit';
import { useActions } from 'hooks/useActions';

const initialState = {
  tasks: [
    {
      title: 'Task 1',
      id: 1,
      description: 'some stupid text',
      isDone: true,
      deadline: new Date().toLocaleDateString(),
      doneDate: new Date().toLocaleDateString(),
    },
    {
      title: 'Task 2',
      id: 2,
      description: 'Some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
    {
      title: 'Task 3',
      id: 3,
      description: 'some stupid text',
      isDone: true,
      deadline: new Date().toLocaleDateString(),
      doneDate: new Date().toLocaleDateString(),
    },
    {
      title: 'Task 4',
      id: 4,
      description: 'Some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: (state, { payload }) => {
      state.tasks.unshift(payload);
    },
    deleteTask: (state, { payload: id }) => {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    toggleTask: (state, { payload }) => {
      const { id } = payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) return state;

      const task = state.tasks[taskIndex];
      const isDone = task.isDone;
      state.tasks[taskIndex] = { ...task, isDone: !isDone };
    },
  },
});

export const selectTasks = (state) => state.tasks.tasks;

export const useTasksActions = () => {
  const tasksActions = useActions(tasksSlice.actions);
  return tasksActions;
};

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
