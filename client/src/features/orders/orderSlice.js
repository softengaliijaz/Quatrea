import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { makeThunk } from '../../utils/makeThunk';

export const createOrder = makeThunk('orders/create', async (body) => (await api.post('/orders', body)).data);
export const fetchMyOrders = makeThunk('orders/mine', async () => (await api.get('/orders/mine')).data);
export const fetchOrder = makeThunk('orders/one', async (id) => (await api.get(`/orders/${id}`)).data);
export const cancelOrder = makeThunk('orders/cancel', async (id) => (await api.patch(`/orders/${id}/cancel`)).data);
export const fetchAllOrders = makeThunk('orders/all', async () => (await api.get('/orders')).data);
export const updateOrderStatus = makeThunk('orders/status', async ({ id, status }) => (await api.patch(`/orders/${id}/status`, { status })).data);

const replace = (list, order) => list.map((o) => (o._id === order._id ? { ...o, ...order } : o));

const orderSlice = createSlice({
  name: 'orders',
  initialState: { mine: [], all: [], current: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMyOrders.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchMyOrders.fulfilled, (s, a) => { s.status = 'succeeded'; s.mine = a.payload.items; })
      .addCase(fetchMyOrders.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; })
      .addCase(createOrder.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(createOrder.fulfilled, (s, a) => { s.status = 'succeeded'; s.current = a.payload.order; s.mine.unshift(a.payload.order); })
      .addCase(createOrder.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; })
      .addCase(fetchOrder.fulfilled, (s, a) => { s.current = a.payload.order; })
      .addCase(cancelOrder.fulfilled, (s, a) => { s.mine = replace(s.mine, a.payload.order); })
      .addCase(fetchAllOrders.fulfilled, (s, a) => { s.all = a.payload.items; })
      .addCase(updateOrderStatus.fulfilled, (s, a) => { s.all = replace(s.all, a.payload.order); });
  },
});
export default orderSlice.reducer;
