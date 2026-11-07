import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "../features/public/components/layout/Navbar";
import Footer from "../features/public/components/layout/Footer";
import ScrollProgress from "../features/public/components/layout/ScrollProgress";
import PageTransition from "../features/public/components/layout/PageTransition";
import CartDrawer from "../features/public/components/layout/CartDrawer";
import ToastViewport from "../features/public/components/layout/ToastViewport";
import IntroBloom from "../features/public/components/layout/IntroBloom";
import useSmoothScroll from "../hooks/useSmoothScroll";
import useTheme from "../hooks/useTheme";

export default function PublicLayout() {
  const location = useLocation();
  useSmoothScroll();
  useTheme();

  return (
    <>
      <a href="#content" className="skip">
        Skip to content
      </a>
      <ScrollProgress />
      <IntroBloom />
      <Navbar />
      <AnimatePresence
        mode="wait"
        onExitComplete={() =>
          window.__lenis
            ? window.__lenis.scrollTo(0, { immediate: true })
            : window.scrollTo(0, 0)
        }
      >
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <ToastViewport />
    </>
  );
}
