import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import StatusPill from '../components/ui/StatusPill';
import { Empty, Loader } from '../components/ui/Loader';
import { cancelOrder, fetchMyOrders } from '../features/orders/orderSlice';
import { dateFmt, money } from '../utils/makeThunk';

export default function Orders() {
  const dispatch = useDispatch();
  const { mine, status } = useSelector((s) => s.orders);
  useEffect(() => { dispatch(fetchMyOrders()); }, [dispatch]);

  const cancel = async (id) => {
    const res = await dispatch(cancelOrder(id));
    if (res.error) toast.error(res.payload); else toast.success('Order cancelled');
  };

  return (
    <section className="page container">
      <h1 className="h1">My orders</h1>
      {status === 'loading' && !mine.length && <Loader />}
      {status !== 'loading' && !mine.length && <Empty title="No orders yet">When you place an order it will appear here. <Link to="/collection" className="link">Browse the collection</Link></Empty>}
      <ul className="order-list">
        {mine.map((o) => (
          <li key={o._id} className="card">
            <div className="order-top"><div><strong>Order {o._id.slice(-6).toUpperCase()}</strong><p className="muted small">{dateFmt(o.createdAt)}</p></div><StatusPill status={o.status} /></div>
            <p className="muted">{o.items.map((i) => `${i.qty} × ${i.name}`).join(', ')}</p>
            <div className="order-foot"><strong>{money(o.total)}</strong>
              <span><Link to={`/orders/${o._id}`} className="link">View details</Link>{['pending', 'paid'].includes(o.status) && <button className="link danger" onClick={() => cancel(o._id)}>Cancel</button>}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
