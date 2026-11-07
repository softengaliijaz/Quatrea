import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartDrawerOpen: false, soundEnabled: false, toast: null },
  reducers: {
    openCartDrawer(state) {
      state.cartDrawerOpen = true;
    },
    closeCartDrawer(state) {
      state.cartDrawerOpen = false;
    },
    toggleSound(state) {
      state.soundEnabled = !state.soundEnabled;
    },
    showToast(state, { payload }) {
      state.toast = { id: Date.now(), message: payload };
    },
    dismissToast(state) {
      state.toast = null;
    },
  },
});

export const {
  openCartDrawer,
  closeCartDrawer,
  toggleSound,
  showToast,
  dismissToast,
} = uiSlice.actions;
export default uiSlice.reducer;
