import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Bottle from '../components/ui/Bottle';
import Stars from '../components/ui/Stars';
import Icon from '../components/ui/Icon';
import Reviews from '../components/ui/Reviews';
import { Loader, Empty } from '../components/ui/Loader';
import useShop from '../hooks/useShop';
import { clearCurrent, fetchPerfume } from '../features/perfumes/perfumeSlice';
import { seasonByKey } from '../constants/seasons';
import { money } from '../utils/makeThunk';

const LAYERS = [['top', 'Top', 'The first ten minutes'], ['heart', 'Heart', 'The next few hours'], ['base', 'Base', 'What stays on your skin']];

export default function PerfumeDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { current: p, detailStatus } = useSelector((s) => s.perfumes);
  const { add, wish, isWished } = useShop();
  const [qty, setQty] = useState(1);

  useEffect(() => { dispatch(fetchPerfume(slug)); return () => dispatch(clearCurrent()); }, [dispatch, slug]);

  if (detailStatus === 'failed') return <section className="page container"><Empty title="Fragrance not found">It may have been retired. <Link to="/collection" className="link">Back to the collection</Link></Empty></section>;
  if (!p) return <Loader />;
  const color = p.accent || seasonByKey[p.season]?.color;
  const wished = isWished(p._id);

  return (
    <section className="detail" style={{ '--season': color }}>
      <div className="container detail-grid">
        <div className="detail-art">
          <div className="story-halo" aria-hidden="true" />
          <motion.div initial={{ y: 60, opacity: 0, rotate: -6 }} animate={{ y: 0, opacity: 1, rotate: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}>
            <Bottle color={color} name={p.name} height={440} />
          </motion.div>
        </div>

        <div className="detail-info">
          <p className="pcard-season">{seasonByKey[p.season]?.name} · {p.sizeMl} ml</p>
          <h1 className="h1">{p.name}</h1>
          <p className="lead">{p.tagline}</p>
          <div className="pcard-meta"><Stars value={p.ratingAvg} /><span className="muted small">{p.ratingCount ? `${p.ratingAvg} from ${p.ratingCount} review${p.ratingCount > 1 ? 's' : ''}` : 'No reviews yet'}</span></div>
          <p>{p.description}</p>

          <dl className="pyramid">
            {LAYERS.map(([key, title, hint], i) => (
              <motion.div key={key} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <dt>{title}<span className="muted small">{hint}</span></dt>
                <dd>{p.notes?.[key]?.join(', ')}</dd>
              </motion.div>
            ))}
          </dl>

          <div className="buy">
            <strong className="price">{money(p.price)}</strong>
            <div className="qty" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button><span>{qty}</span><button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase">+</button>
            </div>
            <button className="btn" disabled={p.stock < 1} onClick={() => add(p, qty)}>{p.stock < 1 ? 'Sold out' : 'Add to bag'}</button>
            <button className={`icon-btn wish-inline ${wished ? 'on' : ''}`} onClick={() => wish(p)} aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}><Icon name="heart" fill={wished} /></button>
          </div>
          {p.stock > 0 && p.stock <= 10 && <p className="small warn">Only {p.stock} left in this batch.</p>}
        </div>
      </div>
      <div className="container"><Reviews perfumeId={p._id} /></div>
    </section>
  );
}
