import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Loader } from "../../../components/ui/Loader";

export default function ProtectedRoute() {
  const { user, initialized } = useAuth();
  const location = useLocation();
  if (!initialized) return <Loader />;
  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
