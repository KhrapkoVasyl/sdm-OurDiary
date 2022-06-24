import { configureStore } from '@reduxjs/toolkit';
import { globalReducer } from 'features/global/globalSlice';
import { createLogger } from 'redux-logger';
import { tasksReducer } from 'features/tasks/tasksSlice';
import { authReducer } from './auth/authSlice';

const logger = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: {
    global: globalReducer,
    tasks: tasksReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger);
    }
    return middlewares;
  },
});
