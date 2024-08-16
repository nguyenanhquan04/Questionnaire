import { createSlice } from '@reduxjs/toolkit';

// Function to load questions from localStorage
const loadQuestionsFromLocalStorage = () => {
  const questions = localStorage.getItem('questions');
  return questions ? JSON.parse(questions) : [];
};

// Function to save questions to localStorage
const saveQuestionsToLocalStorage = (questions) => {
  localStorage.setItem('questions', JSON.stringify(questions));
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState: loadQuestionsFromLocalStorage(),
  reducers: {
    addQuestion: (state, action) => {
      const newState = [...state, action.payload];
      saveQuestionsToLocalStorage(newState);
      return newState;
    },
    deleteQuestion: (state, action) => {
      const newState = state.filter((question) => question.id !== action.payload);
      saveQuestionsToLocalStorage(newState);
      return newState;
    },
    updateQuestion: (state, action) => {
      const index = state.findIndex(q => q.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveQuestionsToLocalStorage(state);
      }
    },
    answerQuestion: (state, action) => {
      const index = state.findIndex(q => q.id === action.payload.id);
      if (index !== -1) {
        state[index].answer = action.payload.answer;
        saveQuestionsToLocalStorage(state);
      }
    },
  },
});

export const { addQuestion, deleteQuestion, updateQuestion, answerQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
