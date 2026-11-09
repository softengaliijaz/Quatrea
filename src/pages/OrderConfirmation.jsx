import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { EmptyState } from '../components/common/States';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { money } from '../utils/format';

export default function OrderConfirmation() {
  useDocumentTitle('Order confirmed');
  const order = useSelector((s) => s.order.last);
  if (!order) return <section className="page"><EmptyState level={1} title="No recent order" action={{ label: 'Browse the collection', to: '/collection' }}>When you place an order, your confirmation appears here.</EmptyState></section>;

  return (
    <section className="page max-w-2xl text-center">
      <motion.svg width="96" height="96" viewBox="0 0 96 96" className="mx-auto mb-6" aria-hidden="true">
        <motion.circle cx="48" cy="48" r="42" fill="none" stroke="var(--color-spring)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        <motion.path d="M30 50 l13 13 l25 -28" fill="none" stroke="var(--color-spring)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.7 }} />
      </motion.svg>
      <h1 className="t-h1">Thank you, {order.shipping.fullName.split(' ')[0]}.</h1>
      <p className="t-lead mx-auto">Order <strong className="text-ink">{order.number}</strong> is confirmed. A summary is on its way to {order.shipping.email}.</p>
      <div className="card mt-8 text-left">
        <ul className="grid gap-2">
          {order.lines.map((l) => <li key={`${l.name}-${l.size}`} className="flex justify-between"><span>{l.qty} × {l.name} ({l.size} ml)</span><strong>{money(l.unit * l.qty)}</strong></li>)}
          <li className="flex justify-between border-t border-line pt-3 text-lg"><span>Total</span><strong>{money(order.total)}</strong></li>
        </ul>
        <p className="mt-4 text-sm text-muted">Delivering to {order.shipping.address}, {order.shipping.postalCode} {order.shipping.city}, {order.shipping.country}</p>
      </div>
      <Link to="/collection" className="btn mt-8">Continue exploring</Link>
    </section>
  );
}
