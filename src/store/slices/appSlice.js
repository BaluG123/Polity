import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'targetpolity.preferences.v1';

const initialState = {
  language: 'en',
  themeMode: 'light',
  hasSelectedLanguage: false,
  hydrated: false,
};

export const hydratePreferences = createAsyncThunk('app/hydratePreferences', async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
});

const savePreferences = async (state) => {
  const payload = {
    language: state.language,
    themeMode: state.themeMode,
    hasSelectedLanguage: state.hasSelectedLanguage,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.hasSelectedLanguage = true;
      savePreferences(state);
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      savePreferences(state);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hydratePreferences.fulfilled, (state, action) => {
        if (action.payload) {
          state.language = action.payload.language || 'en';
          state.themeMode = action.payload.themeMode || 'light';
          state.hasSelectedLanguage = !!action.payload.hasSelectedLanguage;
        }
        state.hydrated = true;
      })
      .addCase(hydratePreferences.rejected, state => {
        state.hydrated = true;
      });
  },
});

export const { setLanguage, setThemeMode } = appSlice.actions;
export default appSlice.reducer;
