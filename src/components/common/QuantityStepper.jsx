import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, label = 'Quantity', min = 1, max = 10 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-line" role="group" aria-label={label}>
      <button className="grid size-9 place-items-center rounded-full hover:bg-line disabled:opacity-40" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`}><Minus size={16} /></button>
      <span className="min-w-7 text-center" aria-live="polite">{value}</span>
      <button className="grid size-9 place-items-center rounded-full hover:bg-line disabled:opacity-40" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`}><Plus size={16} /></button>
    </div>
  );
}
