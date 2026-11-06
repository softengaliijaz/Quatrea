import { createSlice, createSelector } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { makeThunk } from '../../utils/makeThunk';

export const fetchCart = makeThunk('cart/fetch', async () => (await api.get('/cart')).data);
export const addToCart = makeThunk('cart/add', async ({ perfumeId, qty = 1 }) => (await api.post('/cart', { perfumeId, qty })).data);
export const updateCartItem = makeThunk('cart/update', async ({ perfumeId, qty }) => (await api.put(`/cart/${perfumeId}`, { qty })).data);
export const removeCartItem = makeThunk('cart/remove', async (perfumeId) => (await api.delete(`/cart/${perfumeId}`)).data);
export const clearCart = makeThunk('cart/clear', async () => (await api.delete('/cart')).data);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    const set = (s, a) => { s.status = 'succeeded'; s.items = a.payload.cart.items; };
    [fetchCart, addToCart, updateCartItem, removeCartItem, clearCart].forEach((t) => {
      b.addCase(t.pending, (s) => { s.status = 'loading'; }).addCase(t.fulfilled, set).addCase(t.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; });
    });
    b.addCase('auth/logout/fulfilled', (s) => { s.items = []; s.status = 'idle'; })
      .addCase('auth/sessionExpired', (s) => { s.items = []; })
      .addCase('orders/create/fulfilled', (s) => { s.items = []; });
  },
});

export const selectCartCount = (s) => s.cart.items.reduce((n, i) => n + i.qty, 0);
export const selectCartTotal = createSelector((s) => s.cart.items, (items) => items.reduce((n, i) => n + i.qty * i.perfume.price, 0));
export default cartSlice.reducer;
