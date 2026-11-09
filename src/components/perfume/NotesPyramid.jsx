import { motion } from 'framer-motion';

const LAYERS = [['top', 'Top', 'The first ten minutes'], ['heart', 'Heart', 'The next few hours'], ['base', 'Base', 'What stays on your skin']];

// Animated scent pyramid: each layer settles in as it enters view.
export default function NotesPyramid({ notes }) {
  return (
    <dl className="my-6 border-t border-line">
      {LAYERS.map(([key, title, hint], i) => (
        <motion.div key={key} className="grid grid-cols-[130px_1fr] items-center gap-4 border-b border-line py-4 sm:grid-cols-[170px_1fr]" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
          <dt className="grid font-medium">{title}<span className="text-sm font-normal text-muted">{hint}</span></dt>
          <dd className="font-display text-xl">{notes[key].join(', ')}</dd>
        </motion.div>
      ))}
    </dl>
  );
}
