import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { makeThunk } from '../../utils/makeThunk';

export const sendMessage = makeThunk('contact/send', async (body) => (await api.post('/contact', body)).data);
export const subscribeNewsletter = makeThunk('contact/subscribe', async (email) => (await api.post('/newsletter/subscribe', { email })).data);
export const fetchMessages = makeThunk('contact/fetch', async () => (await api.get('/contact')).data);
export const markMessageRead = makeThunk('contact/read', async (id) => (await api.patch(`/contact/${id}/read`)).data);
export const deleteMessage = makeThunk('contact/delete', async (id) => (await api.delete(`/contact/${id}`)).data);

const contactSlice = createSlice({
  name: 'contact',
  initialState: { messages: [], status: 'idle', sending: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(sendMessage.pending, (s) => { s.sending = true; })
      .addCase(sendMessage.fulfilled, (s) => { s.sending = false; })
      .addCase(sendMessage.rejected, (s, a) => { s.sending = false; s.error = a.payload; })
      .addCase(subscribeNewsletter.pending, (s) => { s.sending = true; })
      .addCase(subscribeNewsletter.fulfilled, (s) => { s.sending = false; })
      .addCase(subscribeNewsletter.rejected, (s) => { s.sending = false; })
      .addCase(fetchMessages.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchMessages.fulfilled, (s, a) => { s.status = 'succeeded'; s.messages = a.payload.items; })
      .addCase(markMessageRead.fulfilled, (s, a) => { s.messages = s.messages.map((m) => (m._id === a.payload.message._id ? a.payload.message : m)); })
      .addCase(deleteMessage.fulfilled, (s, a) => { s.messages = s.messages.filter((m) => m._id !== a.payload.id); });
  },
});
export default contactSlice.reducer;
