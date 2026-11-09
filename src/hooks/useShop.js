import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { openCart, showToast } from '../redux/slices/uiSlice';

// Cart and wishlist actions with consistent feedback.
export default function useShop() {
  const dispatch = useDispatch();
  const wishIds = useSelector((s) => s.wishlist.ids);

  return {
    isWished: (id) => wishIds.includes(id),
    add: (perfume, size = 50, qty = 1, { open = true } = {}) => {
      dispatch(addItem({ id: perfume.id, size, qty }));
      dispatch(showToast(`${perfume.name} (${size} ml) added to your bag`));
      if (open) dispatch(openCart());
    },
    toggleWish: (perfume) => {
      const was = wishIds.includes(perfume.id);
      dispatch(toggleWishlist(perfume.id));
      dispatch(showToast(was ? `${perfume.name} removed from your wishlist` : `${perfume.name} saved to your wishlist`));
    },
  };
}
