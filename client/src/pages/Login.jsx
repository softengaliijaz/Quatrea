import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Field from "../components/ui/Field";
import useAuth from "../hooks/useAuth";
import { clearAuthError, loginUser } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, status, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  useEffect(
    () => () => {
      dispatch(clearAuthError());
    },
    [dispatch],
  );
  if (user) return <Navigate to={state?.from || "/"} replace />;

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (!res.error) {
      toast.success(`Welcome back, ${res.payload.user.name.split(" ")[0]}`);
      navigate(state?.from || "/", { replace: true });
    }
  };

  return (
    <section className="page container auth">
      <form onSubmit={submit} className="card form">
        <h1 className="h2">Sign in</h1>
        {error && (
          <p className="alert" role="alert">
            {error}
          </p>
        )}
        <Field
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Field
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
        <p className="muted small">
          New to Quatréa?{" "}
          <Link to="/register" state={state} className="link">
            Create an account
          </Link>
        </p>
      </form>
    </section>
  );
}
