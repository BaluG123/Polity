import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTopic: null,
  currentConcept: null,
  bookmarks: [],
  searchQuery: '',
  selectedCategory: 'all',
  currentAffairs: [],
  landmarkCases: [],
  constitutionArticles: [],
  loading: false,
  error: null,
};

const politySlice = createSlice({
  name: 'polity',
  initialState,
  reducers: {
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    setCurrentConcept: (state, action) => {
      state.currentConcept = action.payload;
    },
    addBookmark: (state, action) => {
      const bookmark = action.payload;
      const existingIndex = state.bookmarks.findIndex(item => item.id === bookmark.id);
      if (existingIndex === -1) {
        state.bookmarks.push({
          ...bookmark,
          bookmarkedAt: new Date().toISOString(),
        });
      }
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(item => item.id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCurrentAffairs: (state, action) => {
      state.currentAffairs = action.payload;
    },
    setLandmarkCases: (state, action) => {
      state.landmarkCases = action.payload;
    },
    setConstitutionArticles: (state, action) => {
      state.constitutionArticles = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setSelectedTopic,
  setCurrentConcept,
  addBookmark,
  removeBookmark,
  setSearchQuery,
  setSelectedCategory,
  setCurrentAffairs,
  setLandmarkCases,
  setConstitutionArticles,
  setLoading,
  setError,
  clearError,
} = politySlice.actions;

export default politySlice.reducer;