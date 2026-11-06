import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Field from "../components/ui/Field";
import PerfumeCard from "../components/ui/PerfumeCard";
import useAuth from "../hooks/useAuth";
import { changePassword, updateProfile } from "../features/auth/authSlice";

export default function Account() {
  const dispatch = useDispatch();
  const { user, status } = useAuth();
  const wishlist = useSelector((s) => s.auth.wishlistItems);
  const [profile, setProfile] = useState({
    name: user.name,
    phone: user.phone || "",
  });
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "" });

  const saveProfile = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateProfile(profile));
    if (res.error) toast.error(res.payload);
    else toast.success("Profile saved");
  };
  const savePassword = async (e) => {
    e.preventDefault();
    const res = await dispatch(changePassword(pw));
    if (res.error) return toast.error(res.payload);
    toast.success("Password updated");
    setPw({ currentPassword: "", newPassword: "" });
  };

  return (
    <section className="page container">
      <h1 className="h1">Your account</h1>
      <div className="account-grid">
        <form onSubmit={saveProfile} className="card form">
          <h2 className="h3">Profile</h2>
          <Field
            label="Name"
            required
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Field label="Email" value={user.email} disabled readOnly />
          <Field
            label="Phone"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            autoComplete="tel"
          />
          <button className="btn" disabled={status === "loading"}>
            Save profile
          </button>
        </form>
        <form onSubmit={savePassword} className="card form">
          <h2 className="h3">Password</h2>
          <Field
            label="Current password"
            type="password"
            required
            autoComplete="current-password"
            value={pw.currentPassword}
            onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })}
          />
          <Field
            label="New password"
            type="password"
            required
            minLength="8"
            autoComplete="new-password"
            value={pw.newPassword}
            onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
          />
          <button className="btn" disabled={status === "loading"}>
            Change password
          </button>
        </form>
      </div>
      <h2 className="h2 spaced">Wishlist</h2>
      {wishlist.length ? (
        <div className="grid">
          {wishlist.map((p) => (
            <PerfumeCard key={p._id} perfume={p} />
          ))}
        </div>
      ) : (
        <p className="muted">Tap the heart on any fragrance to save it here.</p>
      )}
    </section>
  );
}
