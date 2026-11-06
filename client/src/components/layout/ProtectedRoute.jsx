import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../ui/Loader";

// Authentication + authorization guard. Use roles={['admin']} for admin-only pages.
export default function ProtectedRoute({ roles }) {
  const { user, initialized } = useAuth();
  const location = useLocation();
  if (!initialized) return <Loader />;
  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
