import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: 'light' },
  reducers: {
    toggleTheme: (s) => { s.mode = s.mode === 'dark' ? 'light' : 'dark'; },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
