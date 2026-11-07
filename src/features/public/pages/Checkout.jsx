import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Bottle from "../../../components/ui/Bottle";
import { clearCart, selectCartTotal } from "../../cart/cartSlice";
import { money } from "../../../utils/format";

export default function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const orderNumber = `QT-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    navigate("/order-confirmed", {
      state: {
        orderNumber,
        firstName: formData.get("firstName"),
        email: formData.get("email"),
        items,
        total,
      },
    });
    dispatch(clearCart());
  };

  if (!items.length) {
    return (
      <main className="page container checkout-empty">
        <h1 className="h1">The bag is empty.</h1>
        <p className="muted lead">A good place to begin again.</p>
        <Link to="/collection" className="btn">Find a fragrance</Link>
      </main>
    );
  }

  return (
    <main className="page container checkout-page">
      <header className="page-head">
        <Link to="/cart" className="link">← Back to your bag</Link>
        <h1 className="h1">A final <em>note.</em></h1>
        <p className="lead muted">This is a demo checkout. No payment is collected and no information leaves this page.</p>
      </header>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit}>
          <fieldset>
            <legend>Where should the note find you?</legend>
            <div className="checkout-fields">
              <label className="field"><span>First name</span><input className="input" name="firstName" required autoComplete="given-name" /></label>
              <label className="field"><span>Last name</span><input className="input" name="lastName" required autoComplete="family-name" /></label>
              <label className="field checkout-field-wide"><span>Email address</span><input className="input" type="email" name="email" required autoComplete="email" /></label>
              <label className="field checkout-field-wide"><span>Address</span><input className="input" name="address" required autoComplete="street-address" /></label>
              <label className="field"><span>City</span><input className="input" name="city" required autoComplete="address-level2" /></label>
              <label className="field"><span>Postcode</span><input className="input" name="postcode" required autoComplete="postal-code" /></label>
              <label className="field checkout-field-wide"><span>Country</span><select className="input" name="country" required defaultValue=""><option value="" disabled>Choose a country</option><option>France</option><option>United Kingdom</option><option>United States</option><option>Japan</option><option>Other</option></select></label>
            </div>
          </fieldset>
          <div className="checkout-demo-note">
            <span aria-hidden="true">✳</span>
            <p><strong>A note on this experience</strong><br />This portfolio checkout is simulated. Please use fictional details; nothing is stored or submitted.</p>
          </div>
          <button type="submit" className="btn checkout-submit">Place a pretend order <span aria-hidden="true">→</span></button>
        </form>

        <aside className="checkout-summary">
          <h2>Your selection</h2>
          <ul>{items.map(({ perfume, qty }) => (
            <li key={perfume._id}>
              <Bottle color={perfume.accent} name={perfume.name} height={72} />
              <span><strong>{perfume.name}</strong><small>{qty} × {money(perfume.price)}</small></span>
              <strong>{money(perfume.price * qty)}</strong>
            </li>
          ))}</ul>
          <div className="drawer-subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div>
          <p className="muted small">Shipping and payment are intentionally not connected.</p>
        </aside>
      </div>
    </main>
  );
}
