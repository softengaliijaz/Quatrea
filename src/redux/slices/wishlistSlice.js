import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: [] },
  reducers: {
    toggleWishlist: (s, { payload }) => {
      s.ids = s.ids.includes(payload) ? s.ids.filter((id) => id !== payload) : [...s.ids, payload];
    },
  },
});
export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
