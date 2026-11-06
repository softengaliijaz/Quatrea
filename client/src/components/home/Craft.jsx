import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LINES = [
  'Every batch is blended by hand.',
  'Natural absolutes, aged for twelve weeks.',
  'Bottled in small runs of five hundred.',
];

function Line({ text, progress, index }) {
  const start = index * 0.25;
  const opacity = useTransform(progress, [start, start + 0.2, start + 0.45], [0.15, 1, 0.15]);
  const x = useTransform(progress, [start, start + 0.25], [index % 2 ? 60 : -60, 0]);
  return <motion.p className="craft-line" style={{ opacity, x }}>{text}</motion.p>;
}

export default function Craft() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 40%'] });
  return (
    <section className="craft" ref={ref}>
      <div className="container">
        {LINES.map((t, i) => <Line key={t} text={t} progress={scrollYProgress} index={i} />)}
      </div>
    </section>
  );
}
