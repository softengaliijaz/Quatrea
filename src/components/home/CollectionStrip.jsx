import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Bottle from '../common/Bottle';
import { PERFUMES } from '../../data/perfumes';
import { seasonByKey } from '../../data/seasons';
import { money } from '../../utils/format';

// Vertical scroll drives a horizontal strip of the four fragrances.
export default function CollectionStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-62%']);

  return (
    <section ref={ref} className="relative h-[360vh]" aria-label="The collection">
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-8 overflow-hidden pt-16">
        <div className="wrap flex flex-wrap items-end justify-between gap-4">
          <h2 className="t-h2 !mb-0">One bottle for every season</h2>
          <Link to="/collection" className="link">See the full collection</Link>
        </div>
        <motion.div className="flex w-max gap-8 px-[4vw] will-change-transform" style={{ x }}>
          {PERFUMES.map((p) => (
            <Link key={p.id} to={`/collection/${p.slug}`} className="flex w-[min(560px,82vw)] flex-col items-start gap-4 rounded-[28px] border border-[color-mix(in_srgb,var(--season)_40%,var(--line))] bg-[color-mix(in_srgb,var(--season)_20%,var(--surface))] p-6 transition-transform duration-500 hover:-translate-y-2 sm:flex-row sm:items-center sm:gap-8 sm:p-8" style={{ '--season': p.accent }}>
              <Bottle color={p.accent} name={p.name} height={240} className="h-[170px] shrink-0 sm:h-[240px]" />
              <div>
                <p className="t-season">{seasonByKey[p.season].name}</p>
                <h3 className="font-display text-4xl leading-tight">{p.name}</h3>
                <p className="mb-2 text-muted">{[...p.notes.top, p.notes.heart[0], p.notes.base[0]].join(', ')}</p>
                <strong>{money(p.basePrice)}</strong>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
