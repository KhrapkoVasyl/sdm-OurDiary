import { configureStore } from '@reduxjs/toolkit';
import { globalReducer } from 'features/global/globalSlice';
import { createLogger } from 'redux-logger';
import { tasksReducer } from 'features/tasks/tasksSlice';

const logger = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: {
    global: globalReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger);
    }
    return middlewares;
  },
});
