import { configureStore } from '@reduxjs/toolkit';
import jokesReducer from './jokesSlice';

const store = configureStore({
  reducer: {
    jokes: jokesReducer,
  },
});

export default store;
