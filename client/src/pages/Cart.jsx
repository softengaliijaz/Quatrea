import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Bottle from '../components/ui/Bottle';
import Field from '../components/ui/Field';
import Icon from '../components/ui/Icon';
import { Empty } from '../components/ui/Loader';
import useAuth from '../hooks/useAuth';
import { clearCart, removeCartItem, selectCartTotal, updateCartItem } from '../features/cart/cartSlice';
import { createOrder } from '../features/orders/orderSlice';
import { money } from '../utils/makeThunk';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const placing = useSelector((s) => s.orders.status === 'loading');
  const [ship, setShip] = useState({ fullName: user?.name || '', address: '', city: '', postalCode: '', country: '', phone: user?.phone || '' });
  const [payment, setPayment] = useState('cod');
  const set = (k) => (e) => setShip({ ...ship, [k]: e.target.value });
  const shipping = total >= 200 || !total ? 0 : 12;

  const change = async (perfumeId, qty) => {
    const res = await dispatch(updateCartItem({ perfumeId, qty }));
    if (res.error) toast.error(res.payload);
  };

  const checkout = async (e) => {
    e.preventDefault();
    const res = await dispatch(createOrder({ shipping: ship, paymentMethod: payment }));
    if (res.error) return toast.error(res.payload);
    toast.success('Order placed. Thank you.');
    navigate(`/orders/${res.payload.order._id}`);
  };

  if (!items.length) {
    return <section className="page container"><Empty title="Your bag is empty">Pick a season to begin. <Link to="/collection" className="link">Browse the collection</Link></Empty></section>;
  }

  return (
    <section className="page container">
      <h1 className="h1">Your bag</h1>
      <div className="cart-grid">
        <ul className="cart-list">
          {items.map(({ perfume: p, qty }) => (
            <li key={p._id} style={{ '--season': p.accent }}>
              <Link to={`/collection/${p.slug}`}><Bottle color={p.accent} name={p.name} height={110} /></Link>
              <div className="cart-info"><h3>{p.name}</h3><p className="muted small">{p.sizeMl} ml · {money(p.price)}</p></div>
              <div className="qty">
                <button onClick={() => change(p._id, Math.max(1, qty - 1))} aria-label={`Decrease ${p.name}`}>−</button><span>{qty}</span><button onClick={() => change(p._id, Math.min(10, qty + 1))} aria-label={`Increase ${p.name}`}>+</button>
              </div>
              <strong>{money(p.price * qty)}</strong>
              <button className="icon-btn" onClick={() => dispatch(removeCartItem(p._id))} aria-label={`Remove ${p.name}`}><Icon name="trash" /></button>
            </li>
          ))}
          <li className="cart-clear"><button className="link small" onClick={() => dispatch(clearCart())}>Empty the bag</button></li>
        </ul>

        <form onSubmit={checkout} className="card form checkout">
          <h2 className="h3">Delivery</h2>
          <Field label="Full name" required value={ship.fullName} onChange={set('fullName')} autoComplete="name" />
          <Field label="Address" required value={ship.address} onChange={set('address')} autoComplete="street-address" />
          <div className="two"><Field label="City" required value={ship.city} onChange={set('city')} /><Field label="Postal code" required value={ship.postalCode} onChange={set('postalCode')} /></div>
          <div className="two"><Field label="Country" required value={ship.country} onChange={set('country')} /><Field label="Phone" required value={ship.phone} onChange={set('phone')} autoComplete="tel" /></div>
          <fieldset className="pay">
            <legend>Payment</legend>
            <label><input type="radio" name="pay" checked={payment === 'cod'} onChange={() => setPayment('cod')} /> Pay on delivery</label>
            <label><input type="radio" name="pay" checked={payment === 'card'} onChange={() => setPayment('card')} /> Card (simulated in this demo)</label>
          </fieldset>
          <dl className="totals">
            <div><dt>Subtotal</dt><dd>{money(total)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping ? money(shipping) : 'Free'}</dd></div>
            <div className="grand"><dt>Total</dt><dd>{money(total + shipping)}</dd></div>
          </dl>
          <button className="btn" disabled={placing}>{placing ? 'Placing order…' : 'Place order'}</button>
        </form>
      </div>
    </section>
  );
}
