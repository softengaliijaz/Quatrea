import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { subscribeNewsletter } from "../../features/contact/contactSlice";

export default function Footer() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const sending = useSelector((s) => s.contact.sending);

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(subscribeNewsletter(email));
    if (res.error) return toast.error(res.payload);
    toast.success(res.payload.message);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2 className="footer-logo">Quatréa</h2>
          <p className="muted">
            Four fragrances, one for each season. Made in small batches and
            never rushed.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/collection">The collection</Link>
            </li>
            <li>
              <Link to="/about">The house</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/orders">Track an order</Link>
            </li>
          </ul>
        </div>
        <form onSubmit={submit} className="newsletter">
          <h3>Letters from the house</h3>
          <p className="muted">
            One email each season, when a new batch is ready.
          </p>
          <div className="newsletter-row">
            <input
              className="input"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button className="btn" disabled={sending}>
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div className="container footer-base muted small">
        © {new Date().getFullYear()} Quatréa. A fictional perfume house created
        for a design exercise.
      </div>
    </footer>
  );
}
