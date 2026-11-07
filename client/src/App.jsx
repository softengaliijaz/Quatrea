import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { bootstrapAuth, fetchMe, fetchWishlist } from "./features/auth/authSlice";
import { fetchCart } from "./features/cart/cartSlice";
import useAuth from "./hooks/useAuth";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import AdminRoute from "./features/auth/components/AdminRoute";
import { Loader } from "./components/ui/Loader";
import About from "./features/public/pages/About";
import Account from "./features/public/pages/Account";
import Cart from "./features/public/pages/Cart";
import Collection from "./features/public/pages/Collection";
import Contact from "./features/public/pages/Contact";
import ForgotPassword from "./features/public/pages/ForgotPassword";
import Home from "./features/public/pages/Home";
import Login from "./features/public/pages/Login";
import NotFound from "./features/public/pages/NotFound";
import OrderDetail from "./features/public/pages/OrderDetail";
import Orders from "./features/public/pages/Orders";
import PerfumeDetail from "./features/public/pages/PerfumeDetail";
import Register from "./features/public/pages/Register";
import ResetPassword from "./features/public/pages/ResetPassword";
import AdminLogin from "./features/admin/pages/AdminLogin";

const Dashboard = lazy(() => import("./features/admin/pages/Dashboard"));
const AdminPerfumes = lazy(
  () => import("./features/admin/components/AdminPerfumes"),
);
const AdminOrders = lazy(
  () => import("./features/admin/components/AdminOrders"),
);
const AdminUsers = lazy(() => import("./features/admin/components/AdminUsers"));
const AdminMessages = lazy(
  () => import("./features/admin/components/AdminMessages"),
);

const adminPage = (Page) => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
);

export default function App() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(bootstrapAuth()).then((result) => {
      if (result.payload?.accessToken) dispatch(fetchMe());
    });
  }, [dispatch]);

  useEffect(() => {
    if (user?.id && user.role !== "admin") {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [user?.id, dispatch]);

  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="collection/:slug" element={<PerfumeDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="admin/login" element={<AdminLogin />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={adminPage(Dashboard)} />
            <Route path="perfumes" element={adminPage(AdminPerfumes)} />
            <Route path="orders" element={adminPage(AdminOrders)} />
            <Route path="users" element={adminPage(AdminUsers)} />
            <Route path="messages" element={adminPage(AdminMessages)} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-ink)",
            fontFamily: "var(--font-body)",
          },
        }}
      />
    </>
  );
}
