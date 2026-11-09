import Stars from '../common/Stars';

export default function ReviewList({ reviews, rating, count }) {
  return (
    <section aria-labelledby="reviews-title" className="max-w-3xl py-12">
      <h2 id="reviews-title" className="t-h2">What people say</h2>
      <div className="mb-6 flex items-center gap-3"><Stars value={rating} size={20} /><span className="text-muted">{rating} average from {count} reviews</span></div>
      <ul className="grid gap-5">
        {reviews.map((r) => (
          <li key={r.id} className="border-b border-line pb-5">
            <div className="flex flex-wrap items-center gap-3"><strong>{r.name}</strong><Stars value={r.rating} size={14} /><span className="text-sm text-muted">{r.date}</span></div>
            <p className="mt-1">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
