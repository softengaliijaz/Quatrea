import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { logoutUser } from "../features/auth/authSlice";

const LINKS = [
  { to: "/admin/dashboard", label: "Dashboard", end: true },
  { to: "/admin/perfumes", label: "Perfumes" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/users", label: "Customers" },
  { to: "/admin/messages", label: "Messages" },
];

const titles = Object.fromEntries(LINKS.map(({ to, label }) => [to, label]));

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setSidebarOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  const signOut = async () => {
    const result = await dispatch(logoutUser());
    if (result.error) toast.error(result.payload);
    else toast.success("You have signed out");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      {sidebarOpen && (
        <button
          className="admin-backdrop"
          aria-label="Close admin navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <NavLink to="/admin/dashboard" className="admin-brand">
          Quatréa <span>Administration</span>
        </NavLink>
        <nav className="admin-nav" aria-label="Administration">
          {LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `admin-nav-link${isActive ? " active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-logout" onClick={signOut}>
          Sign out
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button
            className="admin-menu-toggle"
            aria-label={sidebarOpen ? "Close admin navigation" : "Open admin navigation"}
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <h1>{titles[pathname] || "Administration"}</h1>
          <div className="admin-account">
            <button
              className="admin-profile"
              aria-label="Administrator account"
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((open) => !open)}
            >
              <span className="admin-avatar" aria-hidden="true">
                {user?.name?.slice(0, 1).toUpperCase()}
              </span>
              <span>
                <strong>{user?.name}</strong>
                <small>Administrator</small>
              </span>
            </button>
            {accountOpen && (
              <div className="admin-account-menu" role="menu">
                <p>{user?.email}</p>
                <button role="menuitem" onClick={signOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
