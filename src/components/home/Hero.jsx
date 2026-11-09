import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Bottle from '../common/Bottle';
import { SEASONS } from '../../data/seasons';
import { PERFUMES } from '../../data/perfumes';
import { scrollToEl } from '../../hooks/useSmoothScroll';

const HEIGHTS = [250, 310, 290, 270];
const WORD = 'Quatréa'.split('');
const EASE = [0.2, 0.8, 0.2, 1];

export default function Hero() {
  const { scrollY } = useScroll();
  const l0 = useTransform(scrollY, [0, 700], [0, -40]);
  const l1 = useTransform(scrollY, [0, 700], [0, -110]);
  const l2 = useTransform(scrollY, [0, 700], [0, -70]);
  const l3 = useTransform(scrollY, [0, 700], [0, -150]);
  const lift = [l0, l1, l2, l3];
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative flex min-h-svh flex-col items-center overflow-hidden pb-12 pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_20%,color-mix(in_srgb,var(--color-spring)_28%,transparent),transparent),radial-gradient(50%_50%_at_85%_25%,color-mix(in_srgb,var(--color-summer)_24%,transparent),transparent),radial-gradient(60%_50%_at_80%_85%,color-mix(in_srgb,var(--color-autumn)_22%,transparent),transparent),radial-gradient(50%_50%_at_15%_85%,color-mix(in_srgb,var(--color-winter)_28%,transparent),transparent)]" aria-hidden="true" />
      <motion.div className="wrap relative text-center" style={{ opacity: fade }}>
        <h1 className="m-0 flex justify-center text-[clamp(4.2rem,17vw,15rem)] font-normal leading-[0.95] tracking-[-0.03em]" aria-label="Quatréa">
          {WORD.map((c, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] pt-[0.05em]" aria-hidden="true">
              <motion.span className="inline-block" initial={{ y: '112%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.2 + i * 0.07, ease: EASE }}>{c}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="mx-auto mt-3 max-w-[40ch] text-lg text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}>
          Four seasons, four fragrances. Scroll to walk through the year.
        </motion.p>
      </motion.div>

      <div className="relative mt-auto flex items-end justify-center gap-[clamp(0.5rem,3vw,2.5rem)] pt-6 [&_svg]:h-auto [&_svg]:w-[clamp(60px,14vw,150px)]">
        {SEASONS.map((s, i) => (
          <motion.div key={s.key} style={{ y: lift[i] }}>
            <motion.div initial={{ y: 160, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 + i * 0.12, duration: 1, ease: EASE }}>
              <Link to={`/collection/${PERFUMES.find((p) => p.id === s.perfumeId).slug}`} className="block drop-shadow-[0_24px_24px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:-translate-y-3.5 hover:-rotate-2" aria-label={`${PERFUMES.find((p) => p.id === s.perfumeId).name}, the ${s.name.toLowerCase()} fragrance`}>
                <Bottle color={s.color} name={PERFUMES.find((p) => p.id === s.perfumeId).name} height={HEIGHTS[i]} />
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div className="relative mt-8 flex flex-wrap justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        <Link to="/collection" className="btn">Shop the collection</Link>
        <a href="#year" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); scrollToEl(document.getElementById('year')); }}>Begin the year</a>
      </motion.div>
    </section>
  );
}
