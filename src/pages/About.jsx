import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Bottle from '../components/common/Bottle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PERFUMES } from '../data/perfumes';
import { seasonByKey } from '../data/seasons';

const reveal = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.7 } };

const STEPS = [
  ['Harvest', 'Flowers are picked at dawn, before the sun draws the oils out of the petals.'],
  ['Extraction', 'Petals are distilled or pressed within hours, so the scent is captured while it is fresh.'],
  ['Blending', 'Our perfumer builds each accord by hand, one drop at a time, over dozens of versions.'],
  ['Ageing', 'Every blend rests for twelve weeks in the dark, until the notes settle into one.'],
  ['Bottling', 'Runs of five hundred are filtered, bottled and checked by hand.'],
];

// The line fills and each step lights up as you scroll through the atelier.
function Atelier() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <section ref={ref} className="my-24" aria-labelledby="atelier-title">
      <h2 id="atelier-title" className="t-h2">Inside the atelier</h2>
      <div className="relative mt-8 grid gap-10 pl-10">
        <div className="absolute bottom-2 left-3 top-2 w-px bg-line" aria-hidden="true" />
        <motion.div className="absolute bottom-2 left-3 top-2 w-px origin-top bg-brand" style={{ scaleY }} aria-hidden="true" />
        {STEPS.map(([title, text], i) => (
          <motion.div key={title} className="relative" initial={{ opacity: 0.25 }} whileInView={{ opacity: 1 }} viewport={{ margin: '-30% 0px -30% 0px' }} transition={{ duration: 0.5 }}>
            <span className="absolute -left-[34px] top-2 size-3 rounded-full border-2 border-brand bg-bg" aria-hidden="true" />
            <h3 className="font-display text-3xl">{i + 1}. {title}</h3>
            <p className="text-muted">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function About() {
  useDocumentTitle('The house');
  return (
    <section className="page">
      <motion.h1 className="t-h1 !text-[clamp(3rem,9vw,7rem)]" {...reveal}>A year, bottled four ways.</motion.h1>
      <motion.p className="t-lead max-w-[62ch]" {...reveal}>Quatréa began with a simple question: what would the year smell like if each season had one perfume, and only one? We answered it with four blends, each composed around a single feeling.</motion.p>

      <div className="mt-16 grid gap-16">
        {PERFUMES.map((p, i) => (
          <motion.article key={p.id} className="grid items-center gap-8 md:grid-cols-[1fr_1.3fr] md:gap-12" style={{ '--season': p.accent }} {...reveal}>
            <div className={`relative grid min-h-[260px] place-items-center ${i % 2 ? 'md:order-2' : ''}`}>
              <div className="absolute aspect-square w-[min(320px,70vw)] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--season)_70%,transparent),transparent_68%)] blur-[10px]" aria-hidden="true" />
              <Bottle color={p.accent} name={p.name} height={260} className="relative" />
            </div>
            <div><p className="t-season">{seasonByKey[p.season].name}</p><h2 className="t-h2">{p.name}</h2><p>{p.description}</p></div>
          </motion.article>
        ))}
      </div>

      <Atelier />

      <motion.div className="grid gap-8 border-t border-line pt-12 md:grid-cols-3" {...reveal}>
        {[['Small batches', 'Five hundred bottles per season, so every one is blended and checked by hand.'], ['Honest materials', 'Natural absolutes where they matter, refined synthetics where they are kinder to the planet.'], ['Slow ageing', 'Each blend rests for twelve weeks before it is filtered and bottled.']].map(([t, d]) => (
          <div key={t}><h3 className="mb-1 text-lg">{t}</h3><p className="text-muted">{d}</p></div>
        ))}
      </motion.div>
    </section>
  );
}
