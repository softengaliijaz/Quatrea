import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Field from "../../../components/ui/Field";
import useAuth from "../../../hooks/useAuth";
import { adminLogin, clearAuthError } from "../../auth/authSlice";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(
    () => () => {
      dispatch(clearAuthError());
    },
    [dispatch],
  );

  if (user?.role === "admin")
    return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    const result = await dispatch(adminLogin(form));
    if (result.error) return;
    toast.success(`Welcome, ${result.payload.user.name.split(" ")[0]}`);
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <section className="page container auth">
      <form onSubmit={submit} className="card form">
        <p className="muted small">Quatréa · Administration</p>
        <h1 className="h2">Admin sign in</h1>
        {error && (
          <p className="alert" role="alert">
            {error}
          </p>
        )}
        <Field
          label="Email"
          type="email"
          required
          autoComplete="username"
          value={form.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
        />
        <Field
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={(event) =>
            setForm((current) => ({ ...current, password: event.target.value }))
          }
        />
        <button className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
        <Link to="/" className="link small">
          Return to the storefront
        </Link>
      </form>
    </section>
  );
}
