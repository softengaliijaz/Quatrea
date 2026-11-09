import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Bottle from '../common/Bottle';
import SeasonWorld from '../perfume/SeasonWorld';
import { SEASONS } from '../../data/seasons';
import { PERFUMES } from '../../data/perfumes';

// Pinned scrollytelling: the whole stage takes on the colour of the season you are scrolling through.
export default function SeasonStory() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIdx(Math.min(SEASONS.length - 1, Math.floor(v * SEASONS.length))));
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const bottleY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const season = SEASONS[idx];
  const perfume = PERFUMES.find((p) => p.id === season.perfumeId);

  return (
    <section id="year" ref={ref} className="relative h-[480vh]" aria-label="The four seasons">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden bg-[color-mix(in_srgb,var(--season)_24%,var(--bg))] transition-[background-color] duration-[900ms]" style={{ '--season': season.color }}>
        <SeasonWorld season={season.key} color={season.color} />

        <ol className="absolute left-[clamp(0.6rem,2vw,2rem)] top-1/2 z-10 hidden -translate-y-1/2 gap-5 lg:grid" aria-label="Seasons">
          {SEASONS.map((s, i) => (
            <li key={s.key} className={`flex items-center gap-3 text-sm ${i === idx ? 'text-ink' : 'text-muted'}`}>
              <span className="size-2.5 rounded-full border-2 transition-all duration-500" style={{ borderColor: s.color, background: i === idx ? s.color : 'transparent', transform: i === idx ? 'scale(1.5)' : 'none' }} />
              {s.name}
            </li>
          ))}
        </ol>

        <div className="wrap relative z-[2] grid items-center gap-0 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={season.key} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45 }}>
                <p className="t-season mb-2 !text-2xl">{season.name}</p>
                <h2 className="mb-4 text-[clamp(1.8rem,5.4vw,4.6rem)]">{season.headline}</h2>
                <p className="max-w-[48ch] text-[1.05rem] md:text-lg">{season.text}</p>
                <ul className="my-6 flex flex-wrap gap-2">{season.chips.map((n) => <li key={n} className="tag">{n}</li>)}</ul>
                <Link to={`/collection/${perfume.slug}`} className="btn btn-season">Meet {perfume.name}</Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div className="relative order-first grid place-items-center md:order-none" style={{ rotate, y: bottleY }}>
            <div className="absolute aspect-square w-[min(420px,60vw)] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--season)_70%,transparent),transparent_68%)] blur-[10px]" aria-hidden="true" />
            <Bottle color={season.color} name={perfume.name} height={440} className="relative h-[210px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.28)] md:h-[440px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
