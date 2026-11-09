import { motion } from 'framer-motion';

// Route transition: a colour curtain wipes down, then the page rises into place.
export default function PageTransition({ children }) {
  return (
    <>
      <motion.div className="pointer-events-none fixed inset-0 z-[90] origin-top bg-brand" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 1 }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true" />
      <motion.main id="content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }} exit={{ opacity: 0 }}>
        {children}
      </motion.main>
    </>
  );
}
