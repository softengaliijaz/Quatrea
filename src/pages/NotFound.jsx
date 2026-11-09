import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <section className="page grid place-items-center text-center">
      <motion.h1 className="font-display text-[clamp(6rem,24vw,16rem)] leading-none" animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>404</motion.h1>
      <p className="t-lead mb-6">This page has drifted off with the season.</p>
      <Link to="/" className="btn">Back to the start</Link>
    </section>
  );
}
