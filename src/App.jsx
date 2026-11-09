import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { Skeleton } from './components/common/States';

// Everything except the home page is loaded on demand.
const Collection = lazy(() => import('./pages/Collection'));
const PerfumeDetail = lazy(() => import('./pages/PerfumeDetail'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Journal = lazy(() => import('./pages/Journal'));
const JournalArticle = lazy(() => import('./pages/JournalArticle'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<div className="page"><Skeleton className="h-[60vh]" /></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="collection/:slug" element={<PerfumeDetail />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/:slug" element={<JournalArticle />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order-confirmed" element={<OrderConfirmation />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
