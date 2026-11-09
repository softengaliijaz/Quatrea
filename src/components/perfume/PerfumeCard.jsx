import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Bottle from '../common/Bottle';
import Stars from '../common/Stars';
import useShop from '../../hooks/useShop';
import { seasonByKey } from '../../data/seasons';
import { money } from '../../utils/format';

export default function PerfumeCard({ perfume }) {
  const { add, toggleWish, isWished } = useShop();
  const wished = isWished(perfume.id);
  return (
    <motion.article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface" style={{ '--season': perfume.accent }} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <button className={`absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-surface/80 transition hover:scale-110 ${wished ? 'text-autumn' : 'text-ink'}`} onClick={() => toggleWish(perfume)} aria-pressed={wished} aria-label={wished ? `Remove ${perfume.name} from wishlist` : `Add ${perfume.name} to wishlist`}>
        <Heart size={18} className={wished ? 'fill-current' : ''} />
      </button>
      <Link to={`/collection/${perfume.slug}`} className="grid place-items-center bg-[radial-gradient(circle_at_50%_60%,color-mix(in_srgb,var(--season)_45%,transparent),transparent_70%)] px-0 pb-4 pt-7" aria-label={`View ${perfume.name}`}>
        <Bottle color={perfume.accent} name={perfume.name} height={210} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="t-season">{seasonByKey[perfume.season].name}</p>
        <h3 className="font-display text-[1.7rem] leading-tight"><Link to={`/collection/${perfume.slug}`}>{perfume.name}</Link></h3>
        <p className="mb-2 text-muted">{perfume.tagline}</p>
        <div className="mb-4 flex items-center gap-2"><Stars value={perfume.rating} size={14} /><span className="text-sm text-muted">({perfume.reviewCount})</span></div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <strong>{money(perfume.basePrice)}<span className="text-sm font-normal text-muted"> / 50 ml</span></strong>
          <button className="btn btn-sm" onClick={() => add(perfume, 50)}>Add to bag</button>
        </div>
      </div>
    </motion.article>
  );
}
