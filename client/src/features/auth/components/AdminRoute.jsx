import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Loader } from "../../../components/ui/Loader";

export default function AdminRoute() {
  const { user, initialized } = useAuth();
  const location = useLocation();

  if (!initialized) return <Loader />;
  if (!user)
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}
