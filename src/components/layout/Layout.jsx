import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import PageTransition from './PageTransition';
import CartDrawer from './CartDrawer';
import ToastHost from '../common/ToastHost';
import useSmoothScroll, { scrollToTop } from '../../hooks/useSmoothScroll';
import useTheme from '../../hooks/useTheme';

export default function Layout() {
  const location = useLocation();
  // useOutlet keeps the outgoing page's element alive while it animates out.
  const outlet = useOutlet();
  useSmoothScroll();
  useTheme();

  return (
    <>
      <a href="#content" className="absolute -left-[999px] top-2 z-[200] rounded-lg bg-brand px-4 py-2 text-brand-ink focus:left-2">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
        <PageTransition key={location.pathname}>{outlet}</PageTransition>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <ToastHost />
    </>
  );
}
