import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import PerfumeCard from '../components/perfume/PerfumeCard';
import FilterBar from '../components/perfume/FilterBar';
import { EmptyState, Skeleton } from '../components/common/States';
import useDebounce from '../hooks/useDebounce';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { resetFilters } from '../redux/slices/filterSlice';
import { PERFUMES } from '../data/perfumes';

const SORTERS = {
  year: () => 0, // data is already in the order of the year
  'price-asc': (a, b) => a.basePrice - b.basePrice,
  'price-desc': (a, b) => b.basePrice - a.basePrice,
  rating: (a, b) => b.rating - a.rating,
};

export default function Collection() {
  useDocumentTitle('Collection');
  const dispatch = useDispatch();
  const f = useSelector((s) => s.filters);
  const search = useDebounce(f.search.trim().toLowerCase(), 250);
  const [loading, setLoading] = useState(true);

  // Short simulated load so the skeleton state is part of the experience.
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);

  const items = useMemo(() => {
    return PERFUMES.filter((p) => {
      if (f.season !== 'all' && p.season !== f.season) return false;
      if (f.family !== 'all' && !p.families.includes(f.family)) return false;
      if (f.maxPrice && p.basePrice > f.maxPrice) return false;
      if (search) {
        const hay = [p.name, p.tagline, p.mood, ...p.notes.top, ...p.notes.heart, ...p.notes.base].join(' ').toLowerCase();
        if (!hay.includes(search)) return false;
      }
      return true;
    }).sort(SORTERS[f.sort]);
  }, [f.season, f.family, f.maxPrice, f.sort, search]);

  return (
    <section className="page">
      <header className="mb-8">
        <h1 className="t-h1">The collection</h1>
        <p className="t-lead max-w-[60ch]">Four fragrances, each one written for a single season. Wear one, or follow the year.</p>
      </header>
      <FilterBar total={loading ? PERFUMES.length : items.length} />

      {loading && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((n) => <Skeleton key={n} className="h-[470px]" />)}</div>}
      {!loading && items.length === 0 && <EmptyState title="No fragrance matches" action={{ label: 'Clear filters', onClick: () => dispatch(resetFilters()) }}>Try another season or scent family, or clear the search.</EmptyState>}
      {!loading && items.length > 0 && (
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
          {items.map((p) => <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}><PerfumeCard perfume={p} /></motion.div>)}
        </motion.div>
      )}
    </section>
  );
}
