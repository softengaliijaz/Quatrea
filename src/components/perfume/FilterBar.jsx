import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { resetFilters, setFilter } from '../../redux/slices/filterSlice';
import { SEASONS } from '../../data/seasons';
import { FAMILIES } from '../../data/perfumes';

export default function FilterBar({ total }) {
  const dispatch = useDispatch();
  const f = useSelector((s) => s.filters);
  const set = (key) => (e) => dispatch(setFilter({ key, value: e.target.value }));
  const dirty = f.season !== 'all' || f.family !== 'all' || f.search || f.maxPrice || f.sort !== 'year';

  return (
    <div className="mb-8 grid gap-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by season">
        <button className={`chip ${f.season === 'all' ? 'chip-on' : ''}`} onClick={() => dispatch(setFilter({ key: 'season', value: 'all' }))}>All seasons</button>
        {SEASONS.map((s) => (
          <button key={s.key} className={`chip ${f.season === s.key ? 'chip-on' : ''}`} style={{ '--c': s.color }} onClick={() => dispatch(setFilter({ key: 'season', value: s.key }))} aria-pressed={f.season === s.key}>{s.name}</button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <label className="relative block">
          <span className="sr-only">Search perfumes</span>
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input className="input !pl-10" type="search" placeholder="Search a name or note" value={f.search} onChange={set('search')} />
        </label>
        <select className="input" value={f.family} onChange={set('family')} aria-label="Scent family">
          <option value="all">Any scent family</option>
          {FAMILIES.map((fam) => <option key={fam} value={fam}>{fam[0].toUpperCase() + fam.slice(1)}</option>)}
        </select>
        <select className="input" value={f.maxPrice} onChange={(e) => dispatch(setFilter({ key: 'maxPrice', value: Number(e.target.value) }))} aria-label="Maximum price">
          <option value={0}>Any price</option><option value={100}>Up to $100</option><option value={110}>Up to $110</option><option value={120}>Up to $120</option>
        </select>
        <select className="input" value={f.sort} onChange={set('sort')} aria-label="Sort by">
          <option value="year">Order of the year</option><option value="price-asc">Price, low to high</option><option value="price-desc">Price, high to low</option><option value="rating">Best rated</option>
        </select>
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span aria-live="polite">{total} {total === 1 ? 'fragrance' : 'fragrances'}</span>
        {dirty && <button className="link" onClick={() => dispatch(resetFilters())}>Clear filters</button>}
      </div>
    </div>
  );
}
