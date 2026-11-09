import { useState } from 'react';
import ArticleCard from '../components/journal/ArticleCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ARTICLES } from '../data/journal';
import { SEASONS } from '../data/seasons';

export default function Journal() {
  useDocumentTitle('Journal');
  const [season, setSeason] = useState('all');
  const list = ARTICLES.filter((a) => season === 'all' || a.season === season);
  return (
    <section className="page">
      <h1 className="t-h1">The journal</h1>
      <p className="t-lead mb-8 max-w-[60ch]">Short stories about how we make perfume, and how to live with it.</p>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by season">
        <button className={`chip ${season === 'all' ? 'chip-on' : ''}`} onClick={() => setSeason('all')}>All</button>
        {SEASONS.map((s) => <button key={s.key} className={`chip ${season === s.key ? 'chip-on' : ''}`} style={{ '--c': s.color }} onClick={() => setSeason(s.key)} aria-pressed={season === s.key}>{s.name}</button>)}
      </div>
      <div className="grid gap-6 md:grid-cols-2">{list.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
    </section>
  );
}
