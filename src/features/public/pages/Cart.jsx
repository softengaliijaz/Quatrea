import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Bottle from "../../../components/ui/Bottle";
import Icon from "../../../components/ui/Icon";
import { Empty } from "../../../components/ui/Loader";
import {
  clearCart,
  removeCartItem,
  selectCartTotal,
  updateCartItem,
} from "../../cart/cartSlice";
import { money } from "../../../utils/format";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);

  if (!items.length) {
    return (
      <section className="page container">
        <Empty title="Your bag is taking a quiet moment">
          Choose a fragrance to begin.{" "}
          <Link to="/collection" className="link">
            Browse the collection
          </Link>
        </Empty>
      </section>
    );
  }

  return (
    <section className="page container">
      <header className="page-head">
        <h1 className="h1">Your bag</h1>
        <p className="muted lead">
          A local preview of the fragrances you have chosen.
        </p>
      </header>
      <div className="cart-grid">
        <ul className="cart-list">
          {items.map(({ perfume, qty }) => (
            <li key={perfume._id} style={{ "--season": perfume.accent }}>
              <Link to={`/collection/${perfume.slug}`}>
                <Bottle
                  color={perfume.accent}
                  name={perfume.name}
                  height={110}
                />
              </Link>
              <div className="cart-info">
                <h3>{perfume.name}</h3>
                <p className="muted small">
                  {perfume.sizeMl} ml · {money(perfume.price)}
                </p>
              </div>
              <div className="qty" aria-label={`${perfume.name} quantity`}>
                <button
                  onClick={() =>
                    dispatch(
                      updateCartItem({
                        perfumeId: perfume._id,
                        qty: qty - 1,
                      }),
                    )
                  }
                  aria-label={`Decrease ${perfume.name}`}
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  onClick={() =>
                    dispatch(
                      updateCartItem({
                        perfumeId: perfume._id,
                        qty: qty + 1,
                      }),
                    )
                  }
                  aria-label={`Increase ${perfume.name}`}
                  disabled={qty >= 10}
                >
                  +
                </button>
              </div>
              <strong>{money(perfume.price * qty)}</strong>
              <button
                className="icon-btn"
                onClick={() => dispatch(removeCartItem(perfume._id))}
                aria-label={`Remove ${perfume.name}`}
              >
                <Icon name="trash" />
              </button>
            </li>
          ))}
          <li className="cart-clear">
            <button
              className="link small"
              onClick={() => dispatch(clearCart())}
            >
              Empty the bag
            </button>
          </li>
        </ul>

        <aside className="card cart-summary">
          <p className="eyebrow">A considered selection</p>
          <h2 className="h3">Bag summary</h2>
          <dl className="totals">
            <div>
              <dt>{items.reduce((count, item) => count + item.qty, 0)} pieces</dt>
              <dd>{money(total)}</dd>
            </div>
            <div className="grand">
              <dt>Subtotal</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <p className="muted small">
            This portfolio experience is a frontend-only concept. Checkout and
            payment are not available.
          </p>
          <Link to="/collection" className="btn btn-ghost">
            Continue exploring
          </Link>
        </aside>
      </div>
    </section>
  );
}
