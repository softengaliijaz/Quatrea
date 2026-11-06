import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/auth/authSlice";

// Cart and wishlist actions that send guests to the sign-in page first.
export default function useShop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const needSignIn = () => {
    toast("Sign in to continue");
    navigate("/login", { state: { from: location.pathname } });
  };

  const add = async (perfume, qty = 1) => {
    if (!user) return needSignIn();
    const res = await dispatch(addToCart({ perfumeId: perfume._id, qty }));
    if (res.error) toast.error(res.payload);
    else toast.success(`${perfume.name} is in your bag`);
  };

  const wish = async (perfume) => {
    if (!user) return needSignIn();
    const res = await dispatch(toggleWishlist(perfume._id));
    if (res.error) toast.error(res.payload);
    else
      toast.success(
        res.payload.added
          ? "Saved to your wishlist"
          : "Removed from your wishlist",
      );
  };

  return { add, wish, isWished: (id) => !!user?.wishlist?.includes(id) };
}
