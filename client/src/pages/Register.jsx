import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Field from "../components/ui/Field";
import useAuth from "../hooks/useAuth";
import { clearAuthError, registerUser } from "../features/auth/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, status, error } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [local, setLocal] = useState("");
  useEffect(
    () => () => {
      dispatch(clearAuthError());
    },
    [dispatch],
  );
  if (user) return <Navigate to={state?.from || "/"} replace />;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8)
      return setLocal("Password must be at least 8 characters");
    setLocal("");
    const res = await dispatch(registerUser(form));
    if (!res.error) {
      toast.success("Your account is ready");
      navigate(state?.from || "/", { replace: true });
    }
  };

  return (
    <section className="page container auth">
      <form onSubmit={submit} className="card form">
        <h1 className="h2">Create your account</h1>
        {(local || error) && (
          <p className="alert" role="alert">
            {local || error}
          </p>
        )}
        <Field
          label="Full name"
          required
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
        />
        <Field
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
        />
        <Field
          label="Password"
          type="password"
          required
          autoComplete="new-password"
          value={form.password}
          onChange={set("password")}
        />
        <button className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Creating…" : "Create account"}
        </button>
        <p className="muted small">
          Already have an account?{" "}
          <Link to="/login" state={state} className="link">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
