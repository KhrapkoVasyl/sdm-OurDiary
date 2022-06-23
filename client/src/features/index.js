import { configureStore } from '@reduxjs/toolkit';
import { globalReducer } from 'features/global/globalSlice';
import { createLogger } from 'redux-logger';

const logger = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger);
    }
    return middlewares;
  },
});
