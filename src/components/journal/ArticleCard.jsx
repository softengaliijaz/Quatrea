import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Bottle from '../common/Bottle';
import { PERFUMES } from '../../data/perfumes';
import { seasonByKey } from '../../data/seasons';

export default function ArticleCard({ article }) {
  const season = seasonByKey[article.season];
  const perfume = PERFUMES.find((p) => p.season === article.season);
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="group overflow-hidden rounded-3xl border border-line bg-surface" style={{ '--season': season.color }}>
      <Link to={`/journal/${article.slug}`} className="block">
        <div className="grid h-52 place-items-center bg-[color-mix(in_srgb,var(--season)_22%,var(--surface))]">
          <Bottle color={perfume.accent} name={perfume.name} height={150} />
        </div>
        <div className="p-6">
          <p className="t-season">{season.name} · {article.readMinutes} min read</p>
          <h3 className="font-display text-2xl leading-tight group-hover:text-brand">{article.title}</h3>
          <p className="mt-2 text-muted">{article.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
}
