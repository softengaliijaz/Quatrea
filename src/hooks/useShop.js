import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  toggleWishlist,
} from "../features/cart/cartSlice";
import {
  openCartDrawer,
  showToast,
} from "../features/ui/uiSlice";

export default function useShop() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);

  const add = (perfume, qty = 1) => {
    dispatch(addToCart({ perfume, qty }));
    dispatch(showToast(`${perfume.name} is in your bag`));
    dispatch(openCartDrawer());
  };

  const wish = (perfume) => {
    const saved = wishlist.includes(perfume._id);
    dispatch(toggleWishlist(perfume._id));
    dispatch(
      showToast(
        saved ? "Removed from your saved fragrances" : "Saved for later",
      ),
    );
  };

  return { add, wish, isWished: (id) => wishlist.includes(id) };
}
