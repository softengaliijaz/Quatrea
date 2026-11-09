import { createSlice } from '@reduxjs/toolkit';

const initialState = { season: 'all', family: 'all', search: '', sort: 'year', maxPrice: 0 };

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (s, { payload: { key, value } }) => { s[key] = value; },
    resetFilters: () => initialState,
  },
});
export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
