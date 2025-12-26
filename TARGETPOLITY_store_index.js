import { configureStore } from '@reduxjs/toolkit';
import politySlice from './slices/politySlice';
import progressSlice from './slices/progressSlice';
import authSlice from './slices/authSlice';
import quizSlice from './slices/quizSlice';

export const store = configureStore({
  reducer: {
    polity: politySlice,
    progress: progressSlice,
    auth: authSlice,
    quiz: quizSlice,
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