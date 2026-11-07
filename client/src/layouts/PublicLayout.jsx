import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "../features/public/components/layout/Navbar";
import Footer from "../features/public/components/layout/Footer";
import ScrollProgress from "../features/public/components/layout/ScrollProgress";
import PageTransition from "../features/public/components/layout/PageTransition";
import useSmoothScroll from "../hooks/useSmoothScroll";
import useTheme from "../hooks/useTheme";

export default function Layout() {
  const location = useLocation();
  useSmoothScroll();
  const { mode } = useTheme();

  return (
    <>
      <a href="#content" className="skip">
        Skip to content
      </a>
      <ScrollProgress />
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
          <div id="content">
            <Outlet />
          </div>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
}
