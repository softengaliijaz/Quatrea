import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import Bottle from '../components/common/Bottle';
import Stars from '../components/common/Stars';
import QuantityStepper from '../components/common/QuantityStepper';
import { EmptyState } from '../components/common/States';
import NotesPyramid from '../components/perfume/NotesPyramid';
import ReviewList from '../components/perfume/ReviewList';
import SeasonWorld from '../components/perfume/SeasonWorld';
import useShop from '../hooks/useShop';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PERFUMES, SIZES, getPerfume, priceFor } from '../data/perfumes';
import { seasonByKey } from '../data/seasons';
import { money } from '../utils/format';

// The bottle follows the pointer in 3D.
function TiltBottle({ perfume }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 120, damping: 14 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [14, -14]), { stiffness: 120, damping: 14 });
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const reset = () => { mx.set(0); my.set(0); };
  return (
    <div className="relative grid min-h-[340px] place-items-center md:min-h-[480px]" style={{ perspective: 900 }} onPointerMove={move} onPointerLeave={reset}>
      <div className="absolute aspect-square w-[min(420px,80vw)] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--season)_70%,transparent),transparent_68%)] blur-[10px]" aria-hidden="true" />
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <Bottle color={perfume.accent} name={perfume.name} height={440} className="h-[320px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)] md:h-[440px]" />
      </motion.div>
    </div>
  );
}

export default function PerfumeDetail() {
  const { slug } = useParams();
  const perfume = getPerfume(slug);
  useDocumentTitle(perfume?.name || 'Not found');
  const { add, toggleWish, isWished } = useShop();
  const [size, setSize] = useState(50);
  const [qty, setQty] = useState(1);

  if (!perfume) return <section className="page"><EmptyState level={1} title="Fragrance not found" action={{ label: 'Back to the collection', to: '/collection' }}>That fragrance may have been retired, or the link is mistyped.</EmptyState></section>;

  const wished = isWished(perfume.id);
  const others = PERFUMES.filter((p) => p.id !== perfume.id);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,color-mix(in_srgb,var(--season)_16%,var(--bg)),var(--bg)_60%)] pt-24" style={{ '--season': perfume.accent }}>
      <SeasonWorld season={perfume.season} color={perfume.accent} />
      <div className="wrap relative grid items-center gap-8 pb-12 md:grid-cols-2 md:gap-16">
        <TiltBottle perfume={perfume} />
        <div>
          <p className="t-season">{seasonByKey[perfume.season].name} · {perfume.longevity}</p>
          <h1 className="t-h1">{perfume.name}</h1>
          <p className="t-lead mb-3 !text-ink">{perfume.tagline}</p>
          <div className="mb-4 flex items-center gap-3"><Stars value={perfume.rating} /><span className="text-sm text-muted">{perfume.rating} from {perfume.reviewCount} reviews</span></div>
          <p>{perfume.description}</p>
          <NotesPyramid notes={perfume.notes} />

          <fieldset className="mb-5">
            <legend className="mb-2 text-sm text-muted">Size</legend>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button key={s.ml} className={`chip ${size === s.ml ? 'chip-on' : ''}`} style={{ '--c': perfume.accent }} onClick={() => setSize(s.ml)} aria-pressed={size === s.ml}>{s.ml} ml · {money(priceFor(perfume, s.ml))}</button>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-4">
            <strong className="font-display text-4xl font-medium">{money(priceFor(perfume, size) * qty)}</strong>
            <QuantityStepper value={qty} onChange={setQty} />
            <button className="btn" onClick={() => add(perfume, size, qty)}>Add to bag</button>
            <button className={`icon-btn ${wished ? 'text-autumn' : ''}`} onClick={() => toggleWish(perfume)} aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}><Heart size={22} className={wished ? 'fill-current' : ''} /></button>
          </div>
        </div>
      </div>

      <div className="wrap relative"><ReviewList reviews={perfume.reviews} rating={perfume.rating} count={perfume.reviewCount} /></div>

      <div className="wrap relative pb-20">
        <h2 className="t-h2">Complete the year</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link key={p.id} to={`/collection/${p.slug}`} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:-translate-y-1" style={{ '--season': p.accent }}>
              <Bottle color={p.accent} name={p.name} height={90} />
              <div><p className="t-season !text-base">{seasonByKey[p.season].name}</p><h3 className="font-display text-2xl">{p.name}</h3></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
