import { createSlice, nanoid } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartOpen: false, toasts: [] },
  reducers: {
    openCart: (s) => { s.cartOpen = true; },
    closeCart: (s) => { s.cartOpen = false; },
    showToast: {
      reducer: (s, { payload }) => { s.toasts.push(payload); },
      prepare: (message) => ({ payload: { id: nanoid(), message } }),
    },
    dismissToast: (s, { payload }) => { s.toasts = s.toasts.filter((t) => t.id !== payload); },
  },
});
export const { openCart, closeCart, showToast, dismissToast } = uiSlice.actions;
export default uiSlice.reducer;
