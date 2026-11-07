import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import PublicLayout from "./layouts/PublicLayout";
const About = lazy(() => import("./features/public/pages/About"));
const Cart = lazy(() => import("./features/public/pages/Cart"));
const Collection = lazy(() => import("./features/public/pages/Collection"));
const Contact = lazy(() => import("./features/public/pages/Contact"));
const Home = lazy(() => import("./features/public/pages/Home"));
const Atelier = lazy(() => import("./features/public/pages/Atelier"));
const Checkout = lazy(() => import("./features/public/pages/Checkout"));
const GiftFinder = lazy(() => import("./features/public/pages/GiftFinder"));
const Journal = lazy(() => import("./features/public/pages/Journal"));
const JournalArticle = lazy(() => import("./features/public/pages/JournalArticle"));
const LayeringLab = lazy(() => import("./features/public/pages/LayeringLab"));
const NotFound = lazy(() => import("./features/public/pages/NotFound"));
const NotesAtlas = lazy(() => import("./features/public/pages/NotesAtlas"));
const OrderConfirmed = lazy(() => import("./features/public/pages/OrderConfirmed"));
const PerfumeDetail = lazy(() => import("./features/public/pages/PerfumeDetail"));
const ScentFinder = lazy(() => import("./features/public/pages/ScentFinder"));
const Stores = lazy(() => import("./features/public/pages/Stores"));
const Wishlist = lazy(() => import("./features/public/pages/Wishlist"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<main className="loader" aria-label="Loading page"><span className="loader-dot" /></main>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="collection" element={<Collection />} />
            <Route path="collection/:slug" element={<PerfumeDetail />} />
            <Route path="discover" element={<ScentFinder />} />
            <Route path="quiz" element={<ScentFinder />} />
            <Route path="lab" element={<LayeringLab />} />
            <Route path="atlas" element={<NotesAtlas />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal/:slug" element={<JournalArticle />} />
            <Route path="atelier" element={<Atelier />} />
            <Route path="gifts" element={<GiftFinder />} />
            <Route path="stores" element={<Stores />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmed" element={<OrderConfirmed />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
