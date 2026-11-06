import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { makeThunk } from "../../utils/makeThunk";

export const fetchReviews = makeThunk(
  "reviews/fetch",
  async (perfumeId) => (await api.get(`/perfumes/${perfumeId}/reviews`)).data,
);
export const addReview = makeThunk(
  "reviews/add",
  async ({ perfumeId, rating, comment }) =>
    (await api.post(`/perfumes/${perfumeId}/reviews`, { rating, comment }))
      .data,
);
export const removeReview = makeThunk(
  "reviews/remove",
  async (id) => (await api.delete(`/reviews/${id}`)).data,
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchReviews.pending, (s) => {
      s.status = "loading";
      s.items = [];
    })
      .addCase(fetchReviews.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload.items;
      })
      .addCase(fetchReviews.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      })
      .addCase(addReview.fulfilled, (s, a) => {
        s.items.unshift(a.payload.review);
      })
      .addCase(removeReview.fulfilled, (s, a) => {
        s.items = s.items.filter((r) => r._id !== a.payload.id);
      });
  },
});
export default reviewSlice.reducer;
