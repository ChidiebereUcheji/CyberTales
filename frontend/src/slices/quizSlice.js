import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizes: JSON.parse(localStorage.getItem('quiz')) || [], // Retrieve from localStorage
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizInfo: (state, action) => {
      state.quizes = action.payload;

      // Save to localStorage
      localStorage.setItem('quiz', JSON.stringify(action.payload));
    },
    clearQuizInfo: (state) => {
      state.quizes = {};

      // Remove from localStorage
      localStorage.removeItem('quiz');
    },
  },
});

export const { setQuizInfo, clearQuizInfo } = quizSlice.actions;

export const selectQuizInfo = (state) => state.quiz.quizes;

export default quizSlice.reducer;