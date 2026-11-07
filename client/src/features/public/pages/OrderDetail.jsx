import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StatusPill from "../../../components/ui/StatusPill";
import { Loader } from "../../../components/ui/Loader";
import { fetchOrder } from "../../orders/orderSlice";
import { dateFmt, money } from "../../../utils/makeThunk";

export default function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const o = useSelector((s) => s.orders.current);
  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);
  if (!o || o._id !== id) return <Loader />;

  return (
    <section className="page container narrow">
      <p className="muted small">
        <Link to="/orders" className="link">
          All orders
        </Link>
      </p>
      <h1 className="h1">Order {o._id.slice(-6).toUpperCase()}</h1>
      <p className="muted">
        Placed on {dateFmt(o.createdAt)} · <StatusPill status={o.status} />
      </p>
      <div className="card">
        <ul className="lines">
          {o.items.map((i) => (
            <li key={i.perfume}>
              <span>
                {i.qty} × {i.name}
              </span>
              <strong>{money(i.price * i.qty)}</strong>
            </li>
          ))}
          <li className="grand">
            <span>Total</span>
            <strong>{money(o.total)}</strong>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2 className="h3">Delivering to</h2>
        <p>
          {o.shipping.fullName}
          <br />
          {o.shipping.address}
          <br />
          {o.shipping.postalCode} {o.shipping.city}, {o.shipping.country}
          <br />
          {o.shipping.phone}
        </p>
        <p className="muted small">
          Payment:{" "}
          {o.paymentMethod === "cod" ? "pay on delivery" : "card (simulated)"}
        </p>
      </div>
    </section>
  );
}
