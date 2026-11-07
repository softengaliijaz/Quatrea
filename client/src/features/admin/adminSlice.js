import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { makeThunk } from "../../utils/makeThunk";

export const fetchStats = makeThunk(
  "admin/stats",
  async () => (await api.get("/admin/stats")).data,
);
export const fetchUsers = makeThunk(
  "admin/users",
  async () => (await api.get("/users")).data,
);
export const updateUserRole = makeThunk(
  "admin/role",
  async ({ id, role }) => (await api.patch(`/users/${id}/role`, { role })).data,
);
export const deleteUser = makeThunk(
  "admin/deleteUser",
  async (id) => (await api.delete(`/users/${id}`)).data,
);

const adminSlice = createSlice({
  name: "admin",
  initialState: { stats: null, users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchStats.pending, (s) => {
      s.status = "loading";
      s.error = null;
    })
      .addCase(fetchStats.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.stats = a.payload.stats;
      })
      .addCase(fetchStats.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || "Unable to load dashboard statistics";
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.users = a.payload.items;
      })
      .addCase(updateUserRole.fulfilled, (s, a) => {
        s.users = s.users.map((u) =>
          u.id === a.payload.user.id ? a.payload.user : u,
        );
      })
      .addCase(deleteUser.fulfilled, (s, a) => {
        s.users = s.users.filter((u) => u.id !== a.payload.id);
      });
  },
});
export default adminSlice.reducer;
