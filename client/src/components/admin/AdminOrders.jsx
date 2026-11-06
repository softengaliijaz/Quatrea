import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../features/orders/orderSlice";
import { dateFmt, money } from "../../utils/makeThunk";

const STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.orders.all);
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const change = async (id, status) => {
    const res = await dispatch(updateOrderStatus({ id, status }));
    if (res.error) toast.error(res.payload);
    else toast.success(`Order marked ${status}`);
  };

  if (!orders.length) return <p className="muted">No orders yet.</p>;
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td data-label="Order">{o._id.slice(-6).toUpperCase()}</td>
              <td data-label="Customer">{o.user?.name || "Deleted user"}</td>
              <td data-label="Items">
                {o.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
              </td>
              <td data-label="Total">{money(o.total)}</td>
              <td data-label="Date">{dateFmt(o.createdAt)}</td>
              <td data-label="Status">
                <select
                  className="input input-sm"
                  value={o.status}
                  onChange={(e) => change(o._id, e.target.value)}
                  aria-label="Order status"
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
