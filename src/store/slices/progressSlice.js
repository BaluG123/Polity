import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studyStreak: 0,
  totalStudyTime: 0,
  completedTopics: [],
  quizScores: [],
  lastStudyDate: null,
  achievements: [],
  weeklyGoal: 5, // hours per week
  dailyGoal: 1, // hour per day
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    updateStudyStreak: (state, action) => {
      state.studyStreak = action.payload;
    },
    addStudyTime: (state, action) => {
      state.totalStudyTime += action.payload;
    },
    markTopicCompleted: (state, action) => {
      const topicId = action.payload;
      if (!state.completedTopics.includes(topicId)) {
        state.completedTopics.push(topicId);
      }
    },
    addQuizScore: (state, action) => {
      state.quizScores.push({
        ...action.payload,
        date: new Date().toISOString(),
      });
    },
    setLastStudyDate: (state, action) => {
      state.lastStudyDate = action.payload;
    },
    addAchievement: (state, action) => {
      state.achievements.push({
        ...action.payload,
        unlockedAt: new Date().toISOString(),
      });
    },
    setWeeklyGoal: (state, action) => {
      state.weeklyGoal = action.payload;
    },
    setDailyGoal: (state, action) => {
      state.dailyGoal = action.payload;
    },
  },
});

export const {
  updateStudyStreak,
  addStudyTime,
  markTopicCompleted,
  addQuizScore,
  setLastStudyDate,
  addAchievement,
  setWeeklyGoal,
  setDailyGoal,
} = progressSlice.actions;

export default progressSlice.reducer;