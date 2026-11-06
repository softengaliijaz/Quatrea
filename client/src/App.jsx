import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import useAuth from './hooks/useAuth';
import { bootstrapAuth, fetchMe, fetchWishlist } from './features/auth/authSlice';
import { fetchCart } from './features/cart/cartSlice';
import Home from './pages/Home';
import Collection from './pages/Collection';
import PerfumeDetail from './pages/PerfumeDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Account from './pages/Account';
import { Loader } from './components/ui/Loader';
const Admin = lazy(() => import('./pages/Admin'));
import NotFound from './pages/NotFound';

export default function App() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  // Restore the session from the refresh cookie, then load the user.
  useEffect(() => {
    dispatch(bootstrapAuth()).then((res) => { if (res.payload?.accessToken) dispatch(fetchMe()); });
  }, [dispatch]);

  // Load the user's cart and wishlist whenever someone signs in.
  useEffect(() => {
    if (user?.id) { dispatch(fetchCart()); dispatch(fetchWishlist()); }
  }, [user?.id, dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="collection/:slug" element={<PerfumeDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="admin" element={<Suspense fallback={<Loader />}><Admin /></Suspense>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
