import { configureStore } from '@reduxjs/toolkit';
import polityReducer from './slices/politySlice';
import authReducer from './slices/authSlice';
import progressReducer from './slices/progressSlice';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    polity: polityReducer,
    auth: authReducer,
    progress: progressReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
