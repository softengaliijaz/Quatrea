import { createSlice, nanoid } from '@reduxjs/toolkit';

// Checkout is simulated on the client. The "order" only lives in memory for the confirmation page.
const orderSlice = createSlice({
  name: 'order',
  initialState: { last: null },
  reducers: {
    placeOrder: {
      reducer: (s, { payload }) => { s.last = payload; },
      prepare: ({ shipping, lines, total }) => ({
        payload: {
          number: `QT-${nanoid(6).toUpperCase().replace(/[^A-Z0-9]/g, 'X')}`,
          placedAt: new Date().toISOString(),
          shipping,
          total,
          lines: lines.map((l) => ({ name: l.perfume.name, size: l.size, qty: l.qty, unit: l.unit })),
        },
      }),
    },
  },
});
export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
