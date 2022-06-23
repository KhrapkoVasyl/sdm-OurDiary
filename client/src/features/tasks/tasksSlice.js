import { createSlice } from '@reduxjs/toolkit';
import { useActions } from 'hooks/useActions';

const initialState = {
  tasks: [
    {
      title: 'Task 1',
      id: 1,
      description: 'some stupid text',
      isDone: true,
      deadline: new Date().toString(),
      doneDate: new Date().toString(),
    },
    {
      title: 'Task 2',
      id: 2,
      description: 'Some stupid text',
      isDone: false,
      deadline: new Date().toString(),
      doneDate: null,
    },
    {
      title: 'Task 3',
      id: 3,
      description: 'some stupid text',
      isDone: true,
      deadline: new Date().toString(),
      doneDate: new Date().toString(),
    },
    {
      title: 'Task 4',
      id: 4,
      description: 'Some stupid text',
      isDone: false,
      deadline: new Date().toString(),
      doneDate: null,
    },
  ],
  taskToEdit: null,
};

const findTaskIndexById = (tasks, id) => {
  return tasks.findIndex((task) => task.id === id);
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
      const taskIndex = findTaskIndexById(state.tasks, id);
      const task = state.tasks[taskIndex];
      const isDone = task.isDone;
      state.tasks[taskIndex] = { ...task, isDone: !isDone };
    },
    updateTask: (state, { payload }) => {
      const { id, editedTask } = payload;
      const taskIndex = findTaskIndexById(state.tasks, id);
      state.tasks[taskIndex] = editedTask;
      state.taskToEdit = null;
    },
    setTaskToEdit: (state, { payload: id }) => {
      if (!id) {
        state.taskToEdit = null;
        return state;
      }
      const taskIndex = findTaskIndexById(state.tasks, id);
      state.taskToEdit = state.tasks[taskIndex];
    },
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
