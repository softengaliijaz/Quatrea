import { Star } from 'lucide-react';

export default function Stars({ value = 0, size = 16 }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} className={n <= Math.round(value) ? 'fill-[#e0a526] text-[#e0a526]' : 'text-line'} aria-hidden="true" />
      ))}
    </span>
  );
}
