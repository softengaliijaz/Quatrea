import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "../../../../components/ui/Icon";
import useTheme from "../../../../hooks/useTheme";
import { selectCartCount } from "../../../../features/cart/cartSlice";
import { EXPLORE_LINKS } from "../../../../constants/navigation";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/collection", label: "Collection" },
  { to: "/discover", label: "Find your scent" },
  { to: "/journal", label: "Journal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const { mode, toggle } = useTheme();
  const count = useSelector(selectCartCount);
  const savedCount = useSelector((state) => state.cart.wishlist.length);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    for (const menu of navRef.current?.querySelectorAll("details") || []) {
      menu.open = false;
    }
  }, [pathname]);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo" aria-label="Quatréa home">
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <circle cx="9" cy="9" r="7" fill="var(--spring)" />
            <circle
              cx="17"
              cy="9"
              r="7"
              fill="var(--summer)"
              fillOpacity=".9"
            />
            <circle
              cx="9"
              cy="17"
              r="7"
              fill="var(--autumn)"
              fillOpacity=".9"
            />
            <circle
              cx="17"
              cy="17"
              r="7"
              fill="var(--winter)"
              fillOpacity=".9"
            />
          </svg>
          <span>Quatréa</span>
        </Link>

        <nav
          ref={navRef}
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Main"
        >
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
          <details className="nav-more">
            <summary>
              Explore <span className="nav-chevron" aria-hidden="true" />
            </summary>
            <div className="nav-more-menu">
              {EXPLORE_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </details>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={toggle}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} theme`}
          >
            <Icon name={mode === "dark" ? "sun" : "moon"} />
          </button>
          <Link
            to="/wishlist"
            className="icon-btn wishlist-btn"
            aria-label={`Saved fragrances, ${savedCount} items`}
          >
            <Icon name="heart" />
            {savedCount > 0 && (
              <span className="badge-count">{savedCount}</span>
            )}
          </Link>
          <Link
            to="/cart"
            className="icon-btn cart-btn"
            aria-label={`Bag, ${count} items`}
          >
            <Icon name="bag" />
            {count > 0 && <span className="badge-count">{count}</span>}
          </Link>
          <button
            className="icon-btn nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
