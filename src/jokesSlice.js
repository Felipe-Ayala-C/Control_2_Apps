import { createSlice } from '@reduxjs/toolkit';

const jokesSlice = createSlice({
  name: 'jokes',
  initialState: {
    savedJokes: [],
  },
  reducers: {
    saveJoke: (state, action) => {
      state.savedJokes.push(action.payload);
    },
  },
});

export const { saveJoke } = jokesSlice.actions;

export default jokesSlice.reducer;
