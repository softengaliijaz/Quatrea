import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Icon from "../../../../components/ui/Icon";
import useAuth from "../../../../hooks/useAuth";
import useTheme from "../../../../hooks/useTheme";
import { logoutUser } from "../../../../features/auth/authSlice";
import { selectCartCount } from "../../../../features/cart/cartSlice";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "The House" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user, isAdmin } = useAuth();
  const { mode, toggle } = useTheme();
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  const signOut = async () => {
    await dispatch(logoutUser());
    toast.success("You have signed out");
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo" aria-label="Quatréa home">
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <circle cx="9" cy="9" r="7" fill="var(--spring)" />
            <circle cx="17" cy="9" r="7" fill="var(--summer)" fillOpacity=".9" />
            <circle cx="9" cy="17" r="7" fill="var(--autumn)" fillOpacity=".9" />
            <circle cx="17" cy="17" r="7" fill="var(--winter)" fillOpacity=".9" />
          </svg>
          <span>Quatréa</span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
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
            to="/cart"
            className="icon-btn cart-btn"
            aria-label={`Bag, ${count} items`}
          >
            <Icon name="bag" />
            {count > 0 && <span className="badge-count">{count}</span>}
          </Link>
          {user ? (
            <div className="user-menu">
              <button
                className="icon-btn"
                onClick={() => setMenu((m) => !m)}
                aria-haspopup="menu"
                aria-expanded={menu}
                aria-label="Account menu"
              >
                <Icon name="user" />
              </button>
              {menu && (
                <div className="menu" role="menu">
                  <p className="menu-name">{user.name}</p>
                  <Link to="/account" role="menuitem">
                    Profile and wishlist
                  </Link>
                  <Link to="/orders" role="menuitem">
                    My orders
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" role="menuitem">
                      Admin dashboard
                    </Link>
                  )}
                  <button onClick={signOut} role="menuitem">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-ghost nav-signin">
              Sign in
            </Link>
          )}
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
