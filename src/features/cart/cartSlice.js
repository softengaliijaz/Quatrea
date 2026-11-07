import { createSelector, createSlice } from "@reduxjs/toolkit";
import { PERFUMES } from "../../data/perfumes";

const initialItems = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("qt-bag") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.flatMap(({ id, qty }) => {
      const perfume = PERFUMES.find((item) => item._id === id);
      return perfume && Number.isInteger(qty) && qty > 0
        ? [{ perfume, qty: Math.min(qty, 10) }]
        : [];
    });
  } catch {
    return [];
  }
};

const initialWishlist = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("qt-wishlist") || "[]");
    return Array.isArray(saved)
      ? saved.filter((id) => PERFUMES.some((item) => item._id === id))
      : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: initialItems(), wishlist: initialWishlist() },
  reducers: {
    addToCart(state, { payload: { perfume, qty = 1 } }) {
      const item = state.items.find((entry) => entry.perfume._id === perfume._id);
      if (item) item.qty = Math.min(10, item.qty + qty);
      else state.items.push({ perfume, qty: Math.min(10, qty) });
    },
    updateCartItem(state, { payload: { perfumeId, qty } }) {
      const item = state.items.find((entry) => entry.perfume._id === perfumeId);
      if (item) item.qty = Math.max(1, Math.min(10, qty));
    },
    removeCartItem(state, { payload: perfumeId }) {
      state.items = state.items.filter(
        (entry) => entry.perfume._id !== perfumeId,
      );
    },
    clearCart(state) {
      state.items = [];
    },
    toggleWishlist(state, { payload: perfumeId }) {
      state.wishlist = state.wishlist.includes(perfumeId)
        ? state.wishlist.filter((id) => id !== perfumeId)
        : [...state.wishlist, perfumeId];
    },
  },
});

export const {
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  toggleWishlist,
} = cartSlice.actions;
export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.qty, 0);
export const selectCartTotal = createSelector(
  (state) => state.cart.items,
  (items) =>
    items.reduce((total, item) => total + item.qty * item.perfume.price, 0),
);
export default cartSlice.reducer;
