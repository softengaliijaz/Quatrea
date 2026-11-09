import { createSelector, createSlice } from '@reduxjs/toolkit';
import { PERFUMES, priceFor } from '../../data/perfumes';

const MAX_QTY = 10;
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] }, // [{ key, id, size, qty }]
  reducers: {
    addItem: (s, { payload: { id, size, qty = 1 } }) => {
      const key = `${id}-${size}`;
      const line = s.items.find((i) => i.key === key);
      if (line) line.qty = Math.min(MAX_QTY, line.qty + qty);
      else s.items.push({ key, id, size, qty: Math.min(MAX_QTY, qty) });
    },
    setQty: (s, { payload: { key, qty } }) => {
      const line = s.items.find((i) => i.key === key);
      if (line) line.qty = Math.max(1, Math.min(MAX_QTY, qty));
    },
    removeItem: (s, { payload }) => { s.items = s.items.filter((i) => i.key !== payload); },
    clearCart: (s) => { s.items = []; },
  },
});

export const { addItem, setQty, removeItem, clearCart } = cartSlice.actions;

const selectItems = (s) => s.cart.items;
// Lines carry the full perfume record and the unit price for the chosen size.
export const selectCartLines = createSelector(selectItems, (items) =>
  items
    .map((i) => {
      const perfume = PERFUMES.find((p) => p.id === i.id);
      return perfume ? { ...i, perfume, unit: priceFor(perfume, i.size) } : null;
    })
    .filter(Boolean)
);
export const selectCartCount = createSelector(selectItems, (items) => items.reduce((n, i) => n + i.qty, 0));
export const selectCartSubtotal = createSelector(selectCartLines, (lines) => lines.reduce((n, l) => n + l.unit * l.qty, 0));

export default cartSlice.reducer;
