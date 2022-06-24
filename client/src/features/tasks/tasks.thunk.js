import { createAsyncThunk } from '@reduxjs/toolkit';
import { globalActions } from 'features/global/globalSlice';
import { getAllTasksRequest } from 'api/tasks/getAllTasks';
import { addNewTaskRequest } from 'api/tasks/addNewTask';
import { updateTaskRequest } from 'api/tasks/updateTask';
import { tasksActions } from './tasksSlice';

const { setIsLoading } = globalActions;
const { addTask, setTasks } = tasksActions;

export const addNewTask = createAsyncThunk(
  'addNewTask',
  async (task, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(setIsLoading(true));
      const resp = await addNewTaskRequest(task);
      const newTask = resp.data.data;
      dispatch(addTask(newTask));
    } catch (err) {
      dispatch(setIsLoading(false));
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'addNewTask',
  async ({ id, task }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(setIsLoading(true));
      const resp = await updateTaskRequest(id, task);
      const updatedTask = resp.data.data;

      dispatch(tasksActions.updateTask({ id, editedTask: updatedTask }));

      dispatch(setIsLoading(false));
    } catch (err) {
      dispatch(setIsLoading(false));
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  'getAllTasks',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(setIsLoading(true));
      const resp = await getAllTasksRequest();
      const respData = resp.data;

      dispatch(setTasks(respData.data));

      dispatch(setIsLoading(false));
    } catch (err) {
      dispatch(setIsLoading(false));
      return rejectWithValue(err.response.data.message);
    }
  }
);
