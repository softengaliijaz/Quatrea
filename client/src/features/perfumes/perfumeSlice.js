import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { makeThunk } from '../../utils/makeThunk';

export const fetchPerfumes = makeThunk('perfumes/fetchAll', async (params = {}) => (await api.get('/perfumes', { params })).data);
export const fetchPerfume = makeThunk('perfumes/fetchOne', async (slug) => (await api.get(`/perfumes/${slug}`)).data);
export const createPerfume = makeThunk('perfumes/create', async (body) => (await api.post('/perfumes', body)).data);
export const updatePerfume = makeThunk('perfumes/update', async ({ id, ...body }) => (await api.put(`/perfumes/${id}`, body)).data);
export const deletePerfume = makeThunk('perfumes/delete', async (id) => (await api.delete(`/perfumes/${id}`)).data);

const perfumeSlice = createSlice({
  name: 'perfumes',
  initialState: { items: [], total: 0, pages: 1, current: null, status: 'idle', detailStatus: 'idle', error: null },
  reducers: {
    clearCurrent: (s) => { s.current = null; s.detailStatus = 'idle'; },
  },
  extraReducers: (b) => {
    b.addCase(fetchPerfumes.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(fetchPerfumes.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload.items; s.total = a.payload.total; s.pages = a.payload.pages; })
      .addCase(fetchPerfumes.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; })
      .addCase(fetchPerfume.pending, (s) => { s.detailStatus = 'loading'; s.current = null; })
      .addCase(fetchPerfume.fulfilled, (s, a) => { s.detailStatus = 'succeeded'; s.current = a.payload.perfume; })
      .addCase(fetchPerfume.rejected, (s, a) => { s.detailStatus = 'failed'; s.error = a.payload; })
      .addCase(createPerfume.fulfilled, (s, a) => { s.items.push(a.payload.perfume); s.total += 1; })
      .addCase(updatePerfume.fulfilled, (s, a) => { s.items = s.items.map((p) => (p._id === a.payload.perfume._id ? a.payload.perfume : p)); })
      .addCase(deletePerfume.fulfilled, (s, a) => { s.items = s.items.filter((p) => p._id !== a.payload.id); s.total -= 1; })
      // keep ratings in sync after a review is added or removed
      .addMatcher((a) => ['reviews/add/fulfilled', 'reviews/remove/fulfilled'].includes(a.type), (s, a) => {
        const p = a.payload.perfume;
        if (!p) return;
        if (s.current?._id === p._id) s.current = p;
        s.items = s.items.map((x) => (x._id === p._id ? p : x));
      });
  },
});

export const { clearCurrent } = perfumeSlice.actions;
export default perfumeSlice.reducer;
