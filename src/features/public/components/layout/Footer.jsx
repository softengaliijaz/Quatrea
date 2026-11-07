import { Link } from "react-router-dom";

export default function Footer() {
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
            For notes on the next collection, write to us directly.
          </p>
          <a
            className="btn btn-ghost"
            href="mailto:hello@quatrea.com?subject=Letters%20from%20the%20house"
          >
            Write to the house
          </a>
        </div>
      </div>
      <div className="container footer-base muted small">
        © {new Date().getFullYear()} Quatréa. A fictional perfume house created
        for a design exercise.
      </div>
    </footer>
  );
}
