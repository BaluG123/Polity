import { configureStore } from '@reduxjs/toolkit';
import polityReducer from './slices/politySlice';
import authReducer from './slices/authSlice';
import progressReducer from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    polity: polityReducer,
    auth: authReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;