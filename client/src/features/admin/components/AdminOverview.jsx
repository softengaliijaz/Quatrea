import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components/ui/Loader";
import { fetchStats } from "../adminSlice";
import { dateFmt, money } from "../../../utils/makeThunk";

export default function AdminOverview() {
  const dispatch = useDispatch();
  const { stats, status, error } = useSelector((s) => s.admin);
  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);
  if (status === "loading" && !stats) return <Loader />;
  if (error && !stats)
    return (
      <div className="card">
        <p className="alert" role="alert">{error}</p>
        <button className="btn btn-sm" onClick={() => dispatch(fetchStats())}>
          Try again
        </button>
      </div>
    );
  if (!stats) return <Loader />;
  const cards = [
    ["Revenue", money(stats.revenue)],
    ["Orders", stats.orders],
    ["Customers", stats.users],
    ["Fragrances", stats.perfumes],
    ["Unread messages", stats.unreadMessages],
    ["Subscribers", stats.subscribers],
  ];
  const activity = [
    ...stats.recentOrders.map((order) => ({
      id: `order-${order._id}`,
      label: `Order #${order._id.slice(-6).toUpperCase()} placed`,
      detail: order.user?.name || "Customer",
      createdAt: order.createdAt,
    })),
    ...stats.recentCustomers.map((customer) => ({
      id: `customer-${customer._id}`,
      label: `${customer.name} joined`,
      detail: "New customer",
      createdAt: customer.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  return (
    <>
      <div className="stat-grid">
        {cards.map(([l, v]) => (
          <div className="card stat" key={l}>
            <span className="muted small">{l}</span>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
      <div className="two-col">
        <div className="card">
          <h2 className="h3">Orders by status</h2>
          <ul className="lines">
            {Object.entries(stats.ordersByStatus).map(([k, v]) => (
              <li key={k}>
                <span>{k}</span>
                <strong>{v}</strong>
              </li>
            ))}
            {!Object.keys(stats.ordersByStatus).length && (
              <li className="muted">No orders yet</li>
            )}
          </ul>
        </div>
        <div className="card">
          <h2 className="h3">Low stock</h2>
          <ul className="lines">
            {stats.lowStock.map((p) => (
              <li key={p._id}>
                <span>{p.name}</span>
                <strong>{p.stock} left</strong>
              </li>
            ))}
            {!stats.lowStock.length && (
              <li className="muted">Everything is well stocked</li>
            )}
          </ul>
        </div>
        <div className="card">
          <h2 className="h3">Recent orders</h2>
          <ul className="lines">
            {stats.recentOrders.map((order) => (
              <li key={order._id}>
                <span>
                  #{order._id.slice(-6).toUpperCase()} ·{" "}
                  {order.user?.name || "Customer"}
                </span>
                <strong>{money(order.total)}</strong>
              </li>
            ))}
            {!stats.recentOrders.length && (
              <li className="muted">No orders yet</li>
            )}
          </ul>
        </div>
        <div className="card">
          <h2 className="h3">Recent customers</h2>
          <ul className="lines">
            {stats.recentCustomers.map((customer) => (
              <li key={customer._id}>
                <span>{customer.name}</span>
                <span className="muted small">{customer.email}</span>
              </li>
            ))}
            {!stats.recentCustomers.length && (
              <li className="muted">No customers yet</li>
            )}
          </ul>
        </div>
        <div className="card">
          <h2 className="h3">Recent activity</h2>
          <ul className="lines">
            {activity.map((item) => (
              <li key={item.id}>
                <span>
                  {item.label}
                  <small className="muted">{item.detail}</small>
                </span>
                <time className="muted small" dateTime={item.createdAt}>
                  {dateFmt(item.createdAt)}
                </time>
              </li>
            ))}
            {!activity.length && (
              <li className="muted">No recent activity</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
