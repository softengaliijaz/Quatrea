import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LINES = ['Every batch is blended by hand.', 'Natural absolutes, aged for twelve weeks.', 'Bottled in small runs of five hundred.'];

function Line({ text, progress, index }) {
  const start = index * 0.25;
  const opacity = useTransform(progress, [start, start + 0.2, start + 0.45], [0.15, 1, 0.15]);
  const x = useTransform(progress, [start, start + 0.25], [index % 2 ? 60 : -60, 0]);
  return <motion.p className={`mb-[6vh] max-w-[18ch] font-display text-[clamp(2rem,6vw,5rem)] leading-[1.1] ${index === 1 ? 'ml-auto text-right' : ''}`} style={{ opacity, x }}>{text}</motion.p>;
}

// Three statements that light up one after another as you scroll past.
export default function CraftText() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 40%'] });
  return (
    <section ref={ref} className="py-[12vh]">
      <div className="wrap">{LINES.map((t, i) => <Line key={t} text={t} progress={scrollYProgress} index={i} />)}</div>
    </section>
  );
}
