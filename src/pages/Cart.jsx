import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import Bottle from '../components/common/Bottle';
import Field from '../components/common/Field';
import QuantityStepper from '../components/common/QuantityStepper';
import { EmptyState } from '../components/common/States';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { clearCart, removeItem, selectCartLines, selectCartSubtotal, setQty } from '../redux/slices/cartSlice';
import { placeOrder } from '../redux/slices/orderSlice';
import { showToast } from '../redux/slices/uiSlice';
import { validateCheckout } from '../utils/validators';
import { money } from '../utils/format';

const FREE_SHIPPING_AT = 200;
const SHIPPING_FEE = 12;

export default function Cart() {
  useDocumentTitle('Your bag');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lines = useSelector(selectCartLines);
  const subtotal = useSelector(selectCartSubtotal);
  const [form, setForm] = useState({ fullName: '', email: '', address: '', city: '', postalCode: '', country: '' });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const shipping = subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const checkout = (e) => {
    e.preventDefault();
    const found = validateCheckout(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setPlacing(true);
    // Simulated payment: a short pause, then the confirmation page.
    setTimeout(() => {
      dispatch(placeOrder({ shipping: form, lines, total }));
      dispatch(clearCart());
      dispatch(showToast('Order placed. Thank you.'));
      navigate('/order-confirmed');
    }, 900);
  };

  if (!lines.length && !placing) {
    return <section className="page"><EmptyState level={1} title="Your bag is empty" action={{ label: 'Browse the collection', to: '/collection' }}>Pick a season to begin.</EmptyState></section>;
  }

  return (
    <section className="page">
      <h1 className="t-h1">Your bag</h1>
      <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
        <ul>
          {lines.map((l) => (
            <li key={l.key} className="grid grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-line py-5 sm:grid-cols-[70px_1fr_auto_auto_auto]">
              <Link to={`/collection/${l.perfume.slug}`}><Bottle color={l.perfume.accent} name={l.perfume.name} height={100} /></Link>
              <div><h3 className="font-display text-2xl">{l.perfume.name}</h3><p className="text-sm text-muted">{l.size} ml · {money(l.unit)}</p></div>
              <QuantityStepper value={l.qty} label={`${l.perfume.name} quantity`} onChange={(qty) => dispatch(setQty({ key: l.key, qty }))} />
              <strong className="text-right">{money(l.unit * l.qty)}</strong>
              <button className="icon-btn" onClick={() => dispatch(removeItem(l.key))} aria-label={`Remove ${l.perfume.name}`}><Trash2 size={18} /></button>
            </li>
          ))}
          <li className="pt-4"><button className="link text-sm" onClick={() => dispatch(clearCart())}>Empty the bag</button></li>
        </ul>

        <form onSubmit={checkout} className="card grid gap-4 lg:sticky lg:top-24" noValidate>
          <h2 className="t-h3 !mb-0">Delivery</h2>
          <Field label="Full name" value={form.fullName} onChange={set('fullName')} error={errors.fullName} autoComplete="name" />
          <Field label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
          <Field label="Address" value={form.address} onChange={set('address')} error={errors.address} autoComplete="street-address" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" value={form.city} onChange={set('city')} error={errors.city} />
            <Field label="Postal code" value={form.postalCode} onChange={set('postalCode')} error={errors.postalCode} autoComplete="postal-code" />
          </div>
          <Field label="Country" value={form.country} onChange={set('country')} error={errors.country} autoComplete="country-name" />
          <dl className="grid gap-1.5 border-t border-line pt-4">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping ? money(shipping) : 'Free'}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 text-lg font-semibold"><dt>Total</dt><dd>{money(total)}</dd></div>
          </dl>
          <p className="text-sm text-muted">Demo checkout: no payment is taken and nothing is stored.</p>
          <button className="btn" disabled={placing}>{placing ? 'Placing order…' : 'Place order'}</button>
        </form>
      </div>
    </section>
  );
}
