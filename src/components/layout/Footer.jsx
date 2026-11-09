import { Link } from 'react-router-dom';
import NewsletterForm from '../common/NewsletterForm';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface pt-16">
      <div className="wrap grid gap-12 md:grid-cols-[1.3fr_0.8fr_1.3fr]">
        <div>
          <h2 className="font-display text-5xl">Quatréa</h2>
          <p className="text-muted">Four fragrances, one for each season. Made in small batches and never rushed.</p>
        </div>
        <nav aria-label="Footer">
          <h3 className="mb-3 font-semibold">Explore</h3>
          <ul className="grid gap-1.5">
            {[['/collection', 'The collection'], ['/quiz', 'Find your season'], ['/journal', 'The journal'], ['/about', 'The house'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-brand">{label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="mb-1 font-semibold">Letters from the house</h3>
          <p className="mb-3 text-muted">One email each season, when a new batch is ready.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="wrap py-12 text-sm text-muted">© {new Date().getFullYear()} Quatréa. A fictional perfume house created for a design exercise.</div>
    </footer>
  );
}
