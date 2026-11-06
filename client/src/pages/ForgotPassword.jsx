import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Field from "../components/ui/Field";
import { requestPasswordReset } from "../features/auth/authSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const result = await dispatch(requestPasswordReset({ email }));
    setStatus(result.error ? "failed" : "succeeded");
    setMessage(
      result.error
        ? result.payload
        : "If the account exists, password reset instructions have been sent.",
    );
  };

  return (
    <section className="page container auth">
      <form onSubmit={submit} className="card form">
        <h1 className="h2">Reset your password</h1>
        <p className="muted">
          Enter your account email and we’ll send a secure reset link.
        </p>
        {message && (
          <p className={status === "failed" ? "alert" : "success"} role="status">
            {message}
          </p>
        )}
        <Field
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send reset link"}
        </button>
        <p className="muted small">
          <Link to="/login" className="link">
            Back to sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
