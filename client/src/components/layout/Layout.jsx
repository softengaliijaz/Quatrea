import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import PageTransition from './PageTransition';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import useTheme from '../../hooks/useTheme';

export default function Layout() {
  const location = useLocation();
  useSmoothScroll();
  const { mode } = useTheme();

  return (
    <>
      <a href="#content" className="skip">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => (window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0))}>
        <PageTransition key={location.pathname}>
          <div id="content"><Outlet /></div>
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <Toaster position="bottom-center" toastOptions={{ style: { background: mode === 'dark' ? '#26242F' : '#17161D', color: '#fff', fontFamily: 'Jost, sans-serif' } }} />
    </>
  );
}
