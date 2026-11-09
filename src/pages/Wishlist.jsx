import { useSelector } from 'react-redux';
import PerfumeCard from '../components/perfume/PerfumeCard';
import { EmptyState } from '../components/common/States';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PERFUMES } from '../data/perfumes';

export default function Wishlist() {
  useDocumentTitle('Wishlist');
  const ids = useSelector((s) => s.wishlist.ids);
  const items = PERFUMES.filter((p) => ids.includes(p.id));
  return (
    <section className="page">
      <h1 className="t-h1">Your wishlist</h1>
      {items.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => <PerfumeCard key={p.id} perfume={p} />)}</div>
      ) : (
        <EmptyState title="Nothing saved yet" action={{ label: 'Browse the collection', to: '/collection' }}>Tap the heart on any fragrance to keep it here.</EmptyState>
      )}
    </section>
  );
}
