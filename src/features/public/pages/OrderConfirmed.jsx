import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Bottle from "../../../components/ui/Bottle";
import { money } from "../../../utils/format";

export default function OrderConfirmed() {
  const { state: order } = useLocation();

  if (!order?.orderNumber) {
    return (
      <main className="page container order-missing">
        <p className="hero-kicker">No order to show</p>
        <h1 className="h1">A blank page in the ledger.</h1>
        <p className="lead muted">There is no recent demo order in this visit.</p>
        <Link to="/collection" className="btn">Return to the collection</Link>
      </main>
    );
  }

  return (
    <main className="order-page">
      <div className="order-orbit" aria-hidden="true"><span /><span /><span /><span /></div>
      <motion.section className="order-card" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="order-seal" aria-hidden="true">Q</span>
        <p className="hero-kicker">A little note from the house</p>
        <h1>Consider it <em>imagined.</em></h1>
        <p className="order-thanks">Thank you{order.firstName ? `, ${order.firstName}` : ""}. In this little demo, your selection has found its way into the ledger.</p>
        <div className="order-number"><span>DEMO REFERENCE</span><strong>{order.orderNumber}</strong></div>
        <ul className="order-items">
          {order.items?.map(({ perfume, qty }) => (
            <li key={perfume._id}>
              <Bottle color={perfume.accent} name={perfume.name} height={76} />
              <span>{perfume.name}<small>{qty} bottle{qty > 1 ? "s" : ""}</small></span>
              <strong>{money(perfume.price * qty)}</strong>
            </li>
          ))}
        </ul>
        <div className="drawer-subtotal"><span>Demo total</span><strong>{money(order.total || 0)}</strong></div>
        <p className="order-footnote">No order was sent, payment taken or personal information saved.</p>
        <Link to="/collection" className="btn btn-ghost">Back to the fragrances</Link>
      </motion.section>
    </main>
  );
}
