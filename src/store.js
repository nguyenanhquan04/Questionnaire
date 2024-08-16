import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questionsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    auth: authReducer,
  },
});

export default store;
