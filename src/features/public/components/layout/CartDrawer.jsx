import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Bottle from "../../../../components/ui/Bottle";
import { money } from "../../../../utils/format";
import {
  clearCart,
  removeCartItem,
  selectCartTotal,
  updateCartItem,
} from "../../../cart/cartSlice";
import { closeCartDrawer } from "../../../ui/uiSlice";
import Icon from "../../../../components/ui/Icon";

export default function CartDrawer() {
  const open = useSelector((state) => state.ui.cartDrawerOpen);
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const closeRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") dispatch(closeCartDrawer());
      if (event.key === "Tab") {
        const focusable = drawerRef.current?.querySelectorAll(
          'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [dispatch, open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="drawer-layer">
          <motion.button
            className="drawer-backdrop"
            type="button"
            aria-label="Close bag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCartDrawer())}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <header className="drawer-head">
              <div>
                <p className="hero-kicker">A considered selection</p>
                <h2 id="drawer-title">Your bag <span>({items.reduce((sum, item) => sum + item.qty, 0)})</span></h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="icon-btn"
                onClick={() => dispatch(closeCartDrawer())}
                aria-label="Close bag"
              >
                <Icon name="close" />
              </button>
            </header>

            {items.length ? (
              <>
                <ul className="drawer-items">
                  {items.map(({ perfume, qty }) => (
                    <li key={perfume._id} className="drawer-item">
                      <Link
                        to={`/collection/${perfume.slug}`}
                        className="drawer-bottle"
                        onClick={() => dispatch(closeCartDrawer())}
                      >
                        <Bottle color={perfume.accent} name={perfume.name} height={110} />
                      </Link>
                      <div className="drawer-item-info">
                        <Link to={`/collection/${perfume.slug}`} onClick={() => dispatch(closeCartDrawer())}>
                          <strong>{perfume.name}</strong>
                        </Link>
                        <span className="muted small">{perfume.sizeMl} ml · {money(perfume.price)}</span>
                        <div className="qty" aria-label={`${perfume.name} quantity`}>
                          <button
                            type="button"
                            onClick={() => dispatch(updateCartItem({ perfumeId: perfume._id, qty: qty - 1 }))}
                            aria-label={`Decrease ${perfume.name}`}
                          >
                            −
                          </button>
                          <span>{qty}</span>
                          <button
                            type="button"
                            onClick={() => dispatch(updateCartItem({ perfumeId: perfume._id, qty: qty + 1 }))}
                            aria-label={`Increase ${perfume.name}`}
                            disabled={qty >= 10}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="drawer-item-end">
                        <strong>{money(perfume.price * qty)}</strong>
                        <button
                          type="button"
                          className="link small"
                          onClick={() => dispatch(removeCartItem(perfume._id))}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="drawer-bottom">
                  <div className="drawer-subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div>
                  <p className="muted small">A local preview only. No payment is collected.</p>
                  <Link
                    className="btn drawer-checkout"
                    to="/checkout"
                    onClick={() => dispatch(closeCartDrawer())}
                  >
                    Continue to checkout <Icon name="arrow" size={17} />
                  </Link>
                  <button type="button" className="link drawer-clear" onClick={() => dispatch(clearCart())}>
                    Empty the bag
                  </button>
                </div>
              </>
            ) : (
              <div className="drawer-empty">
                <span aria-hidden="true">◌</span>
                <h3>A little room for a new favourite.</h3>
                <p className="muted">Your bag is empty for now.</p>
                <Link to="/collection" className="btn btn-ghost" onClick={() => dispatch(closeCartDrawer())}>
                  Find a fragrance
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
