import { configureStore } from "@reduxjs/toolkit";
import perfumes from "../features/perfumes/perfumeSlice";
import cart from "../features/cart/cartSlice";
import theme from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: { perfumes, cart, theme },
});

let persistedCart = store.getState().cart;
store.subscribe(() => {
  const cart = store.getState().cart;
  if (cart === persistedCart) return;
  persistedCart = cart;

  try {
    localStorage.setItem(
      "qt-bag",
      JSON.stringify(
        cart.items.map(({ perfume, qty }) => ({ id: perfume._id, qty })),
      ),
    );
    localStorage.setItem("qt-wishlist", JSON.stringify(cart.wishlist));
  } catch (error) {
    console.warn("Could not save your bag or wishlist on this device.", error);
  }
});
