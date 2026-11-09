import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEASONS } from '../../data/seasons';

export default function QuizTeaser() {
  return (
    <section className="wrap py-[10vh]">
      <div className="grid items-center gap-10 rounded-[32px] border border-line bg-surface p-8 md:grid-cols-2 md:p-14">
        <div>
          <h2 className="t-h2">Which season smells like you?</h2>
          <p className="mb-6 text-muted">Five questions, no wrong answers. We match you with the fragrance that fits your year.</p>
          <Link to="/quiz" className="btn">Take the scent quiz</Link>
        </div>
        <div className="relative mx-auto grid size-56 place-items-center" aria-hidden="true">
          {SEASONS.map((s, i) => (
            <motion.span key={s.key} className="absolute size-32 rounded-full mix-blend-multiply dark:mix-blend-screen" style={{ background: s.color, left: i % 2 ? '50%' : '0', top: i > 1 ? '50%' : '0', opacity: 0.85 }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
