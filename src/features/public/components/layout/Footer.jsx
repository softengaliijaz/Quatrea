import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2 className="footer-logo">Quatréa</h2>
          <p className="muted">
            Four seasonal originals and a growing collection. Made in small
            batches and never rushed.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/collection">The collection</Link>
            </li>
            <li>
              <Link to="/discover">Find your scent</Link>
            </li>
            <li>
              <Link to="/journal">The journal</Link>
            </li>
            <li>
              <Link to="/lab">Layering lab</Link>
            </li>
            <li>
              <Link to="/atlas">Notes atlas</Link>
            </li>
            <li>
              <Link to="/atelier">The atelier</Link>
            </li>
            <li>
              <Link to="/gifts">Gift finder</Link>
            </li>
            <li>
              <Link to="/stores">Our places</Link>
            </li>
            <li>
              <Link to="/about">The house</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="newsletter">
          <h3>Letters from the house</h3>
          <p className="muted">
            A note when the seasons turn. No noise, just the occasional letter.
          </p>
          {subscribed ? (
            <p className="newsletter-success" role="status">You’re on the list for this visit. We don’t collect or store addresses in this demo.</p>
          ) : (
            <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" name="email" autoComplete="email" placeholder="Your email address" required maxLength={254} />
              <button type="submit" className="btn btn-ghost">Join the letters <span aria-hidden="true">→</span></button>
              <small>Demo only. Your address is not sent or saved.</small>
            </form>
          )}
        </div>
      </div>
      <div className="container footer-base muted small">
        © {new Date().getFullYear()} Quatréa. A fictional perfume house created
        for a design exercise.
      </div>
    </footer>
  );
}
