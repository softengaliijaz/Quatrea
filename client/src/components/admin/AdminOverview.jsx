import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../ui/Loader";
import { fetchStats } from "../../features/admin/adminSlice";
import { money } from "../../utils/makeThunk";

export default function AdminOverview() {
  const dispatch = useDispatch();
  const stats = useSelector((s) => s.admin.stats);
  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);
  if (!stats) return <Loader />;
  const cards = [
    ["Revenue", money(stats.revenue)],
    ["Orders", stats.orders],
    ["Customers", stats.users],
    ["Fragrances", stats.perfumes],
    ["Unread messages", stats.unreadMessages],
    ["Subscribers", stats.subscribers],
  ];
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
      </div>
    </>
  );
}
