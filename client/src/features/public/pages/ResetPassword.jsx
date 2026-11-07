import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Field from "../../../components/ui/Field";
import { resetPassword } from "../../auth/authSlice";

export default function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await dispatch(resetPassword({ token, password }));
    setLoading(false);
    if (result.error) {
      setError(result.payload);
      return;
    }
    navigate("/login", {
      replace: true,
      state: { message: "Password updated. Please sign in." },
    });
  };

  return (
    <section className="page container auth">
      <form onSubmit={submit} className="card form">
        <h1 className="h2">Choose a new password</h1>
        {error && (
          <p className="alert" role="alert">
            {error}
          </p>
        )}
        <Field
          label="New password"
          type="password"
          required
          minLength="8"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Field
          label="Confirm new password"
          type="password"
          required
          minLength="8"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <button className="btn" disabled={loading}>
          {loading ? "Updating…" : "Update password"}
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
