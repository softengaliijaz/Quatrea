import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addToCart,
  toggleWishlist,
} from "../features/cart/cartSlice";

export default function useShop() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);

  const add = (perfume, qty = 1) => {
    dispatch(addToCart({ perfume, qty }));
    toast.success(`${perfume.name} is in your bag`);
  };

  const wish = (perfume) => {
    const saved = wishlist.includes(perfume._id);
    dispatch(toggleWishlist(perfume._id));
    toast.success(
      saved ? "Removed from your saved fragrances" : "Saved for later",
    );
  };

  return { add, wish, isWished: (id) => wishlist.includes(id) };
}
