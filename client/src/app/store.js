import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import perfumes from "../features/perfumes/perfumeSlice";
import reviews from "../features/reviews/reviewSlice";
import cart from "../features/cart/cartSlice";
import orders from "../features/orders/orderSlice";
import contact from "../features/contact/contactSlice";
import admin from "../features/admin/adminSlice";
import theme from "../features/theme/themeSlice";
import { injectStore } from "../api/axios";

export const store = configureStore({
  reducer: { auth, perfumes, reviews, cart, orders, contact, admin, theme },
});
injectStore(store);
