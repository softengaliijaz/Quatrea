import { useState } from 'react';
import AdminOverview from '../components/admin/AdminOverview';
import AdminPerfumes from '../components/admin/AdminPerfumes';
import AdminOrders from '../components/admin/AdminOrders';
import AdminMessages from '../components/admin/AdminMessages';
import AdminUsers from '../components/admin/AdminUsers';

const TABS = [
  ['overview', 'Overview', AdminOverview],
  ['perfumes', 'Perfumes', AdminPerfumes],
  ['orders', 'Orders', AdminOrders],
  ['messages', 'Messages', AdminMessages],
  ['users', 'Customers', AdminUsers],
];

export default function Admin() {
  const [tab, setTab] = useState('overview');
  const Active = TABS.find((t) => t[0] === tab)[2];
  return (
    <section className="page container">
      <h1 className="h1">Dashboard</h1>
      <div className="tabs" role="tablist">
        {TABS.map(([key, label]) => <button key={key} role="tab" aria-selected={tab === key} className={tab === key ? 'on' : ''} onClick={() => setTab(key)}>{label}</button>)}
      </div>
      <Active />
    </section>
  );
}
