import { configureStore } from '@reduxjs/toolkit';
import theme from './slices/themeSlice';
import cart from './slices/cartSlice';
import wishlist from './slices/wishlistSlice';
import filters from './slices/filterSlice';
import ui from './slices/uiSlice';
import order from './slices/orderSlice';
import { readStorage, writeStorage } from '../utils/storage';

const systemTheme = () => {
  try { return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch { return 'light'; }
};

// Only theme, cart and wishlist survive a refresh.
const preloadedState = {
  theme: { mode: readStorage('theme') || systemTheme() },
  cart: { items: readStorage('cart', []) },
  wishlist: { ids: readStorage('wishlist', []) },
};

export const store = configureStore({ reducer: { theme, cart, wishlist, filters, ui, order }, preloadedState });

let last = {};
store.subscribe(() => {
  const { theme: t, cart: c, wishlist: w } = store.getState();
  if (t.mode !== last.theme) writeStorage('theme', t.mode);
  if (c.items !== last.cart) writeStorage('cart', c.items);
  if (w.ids !== last.wishlist) writeStorage('wishlist', w.ids);
  last = { theme: t.mode, cart: c.items, wishlist: w.ids };
});
