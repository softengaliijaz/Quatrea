import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Bottle from './Bottle';
import Stars from './Stars';
import Icon from './Icon';
import useShop from '../../hooks/useShop';
import { money } from '../../utils/makeThunk';
import { seasonByKey } from '../../constants/seasons';

export default function PerfumeCard({ perfume }) {
  const { add, wish, isWished } = useShop();
  const color = perfume.accent || seasonByKey[perfume.season]?.color;
  const wished = isWished(perfume._id);
  return (
    <motion.article className="pcard" style={{ '--season': color }} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <button className={`wish ${wished ? 'on' : ''}`} onClick={() => wish(perfume)} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={wished}>
        <Icon name="heart" size={18} fill={wished} />
      </button>
      <Link to={`/collection/${perfume.slug}`} className="pcard-art">
        <Bottle color={color} name={perfume.name} height={210} />
      </Link>
      <div className="pcard-body">
        <p className="pcard-season">{seasonByKey[perfume.season]?.name}</p>
        <h3><Link to={`/collection/${perfume.slug}`}>{perfume.name}</Link></h3>
        <p className="muted">{perfume.tagline}</p>
        <div className="pcard-meta">
          <Stars value={perfume.ratingAvg} size={14} />
          <span className="muted small">{perfume.ratingCount ? `(${perfume.ratingCount})` : 'No reviews yet'}</span>
        </div>
        <div className="pcard-foot">
          <strong>{money(perfume.price)}<span className="muted small"> / {perfume.sizeMl} ml</span></strong>
          <button className="btn btn-sm" onClick={() => add(perfume)} disabled={perfume.stock < 1}>{perfume.stock < 1 ? 'Sold out' : 'Add to bag'}</button>
        </div>
      </div>
    </motion.article>
  );
}
