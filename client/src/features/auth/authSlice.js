import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { makeThunk } from "../../utils/makeThunk";

export const registerUser = makeThunk(
  "auth/register",
  async (body) => (await api.post("/auth/register", body)).data,
);
export const loginUser = makeThunk(
  "auth/login",
  async (body) => (await api.post("/auth/login", body)).data,
);
export const adminLogin = makeThunk(
  "auth/adminLogin",
  async (body) => (await api.post("/auth/admin/login", body)).data,
);
export const requestPasswordReset = makeThunk(
  "auth/forgotPassword",
  async (body) => (await api.post("/auth/forgot-password", body)).data,
);
export const resetPassword = makeThunk(
  "auth/resetPassword",
  async (body) => (await api.post("/auth/reset-password", body)).data,
);
export const logoutUser = makeThunk(
  "auth/logout",
  async () => (await api.post("/auth/logout")).data,
);
export const fetchMe = makeThunk(
  "auth/me",
  async () => (await api.get("/auth/me")).data,
);
export const updateProfile = makeThunk(
  "auth/updateProfile",
  async (body) => (await api.put("/users/me", body)).data,
);
export const changePassword = makeThunk(
  "auth/changePassword",
  async (body) => (await api.put("/users/me/password", body)).data,
);
export const fetchWishlist = makeThunk(
  "auth/fetchWishlist",
  async () => (await api.get("/users/me/wishlist")).data,
);
export const toggleWishlist = makeThunk(
  "auth/toggleWishlist",
  async (perfumeId) => (await api.post(`/users/me/wishlist/${perfumeId}`)).data,
);

// On page load: use the httpOnly refresh cookie to restore the session.
// On page load: use the httpOnly refresh cookie to restore the session.
// The promise is shared so React StrictMode's double effect cannot rotate the cookie twice.
let bootPromise = null;
export const bootstrapAuth = makeThunk("auth/bootstrap", async () => {
  bootPromise =
    bootPromise ||
    api
      .post("/auth/refresh")
      .then((r) => ({ accessToken: r.data.accessToken }))
      .catch(() => ({ accessToken: null }));
  return bootPromise;
});

const initialState = {
  user: null,
  accessToken: null,
  initialized: false,
  status: "idle",
  error: null,
  wishlistItems: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (s) => {
      s.error = null;
    },
  },
  extraReducers: (b) => {
    const pending = (s) => {
      s.status = "loading";
      s.error = null;
    };
    const rejected = (s, a) => {
      s.status = "failed";
      s.error = a.payload;
    };
    const signedIn = (s, a) => {
      s.status = "succeeded";
      s.user = a.payload.user;
      s.accessToken = a.payload.accessToken;
    };
    b.addCase("auth/tokenRefreshed", (s, a) => {
      s.accessToken = a.payload;
    })
      .addCase("auth/sessionExpired", (s) => {
        s.user = null;
        s.accessToken = null;
      })
      .addCase(bootstrapAuth.fulfilled, (s, a) => {
        s.accessToken = a.payload.accessToken;
        if (!a.payload.accessToken) s.initialized = true;
      })
      .addCase(fetchMe.fulfilled, (s, a) => {
        s.user = a.payload.user;
        s.initialized = true;
      })
      .addCase(fetchMe.rejected, (s) => {
        s.user = null;
        s.accessToken = null;
        s.initialized = true;
      })
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, signedIn)
      .addCase(registerUser.rejected, rejected)
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, signedIn)
      .addCase(loginUser.rejected, rejected)
      .addCase(adminLogin.pending, pending)
      .addCase(adminLogin.fulfilled, signedIn)
      .addCase(adminLogin.rejected, rejected)
      .addCase(logoutUser.rejected, (s) => {
        s.user = null;
        s.accessToken = null;
      })
      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
        s.accessToken = null;
        s.wishlistItems = [];
        s.status = "idle";
      })
      .addCase(updateProfile.pending, pending)
      .addCase(updateProfile.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload.user;
      })
      .addCase(updateProfile.rejected, rejected)
      .addCase(changePassword.pending, pending)
      .addCase(changePassword.fulfilled, (s, a) => {
        s.status = "succeeded";
        if (a.payload.accessToken) s.accessToken = a.payload.accessToken;
      })
      .addCase(changePassword.rejected, rejected)
      .addCase(fetchWishlist.fulfilled, (s, a) => {
        s.wishlistItems = a.payload.items;
      })
      .addCase(toggleWishlist.fulfilled, (s, a) => {
        if (s.user) s.user.wishlist = a.payload.wishlist;
        s.wishlistItems = s.wishlistItems.filter((p) =>
          a.payload.wishlist.includes(p._id),
        );
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
