import { Link } from 'react-router-dom';
import ArticleCard from '../journal/ArticleCard';
import { ARTICLES } from '../../data/journal';

export default function JournalPreview() {
  return (
    <section className="wrap pb-[10vh]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="t-h2 !mb-0">From the journal</h2>
        <Link to="/journal" className="link">Read all stories</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">{ARTICLES.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
    </section>
  );
}
