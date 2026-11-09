import { useId } from 'react';

// Illustrated perfume bottle, tinted with the season colour. `level` is the liquid fill (0 to 1).
export default function Bottle({ color = '#7c6bc4', name = '', height = 300, level = 0.82, className = '' }) {
  const id = useId().replace(/:/g, '');
  const top = 212 - 158 * level;
  return (
    <svg viewBox="0 0 120 220" height={height} className={className} role="img" aria-label={`${name || 'Quatréa'} perfume bottle`}>
      <defs>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className="bottle-stop" style={{ stopColor: color }} stopOpacity=".95" />
          <stop offset="1" className="bottle-stop" style={{ stopColor: color }} stopOpacity=".5" />
        </linearGradient>
        <linearGradient id={`s${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".65" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset=".85" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".25" />
        </linearGradient>
        <clipPath id={`c${id}`}><rect x="12" y="54" width="96" height="158" rx="24" /></clipPath>
      </defs>
      <rect x="44" y="6" width="32" height="32" rx="5" fill="var(--ink)" />
      <rect x="49" y="12" width="4" height="20" rx="2" fill="#fff" fillOpacity=".25" />
      <rect x="51" y="38" width="18" height="16" fill="var(--line)" />
      <rect x="12" y="54" width="96" height="158" rx="24" fill="var(--surface)" stroke="var(--ink)" strokeOpacity=".25" />
      <g clipPath={`url(#c${id})`}>
        <rect x="12" y={top} width="96" height="158" fill={`url(#l${id})`} />
        <path d={`M12 ${top} q 12 -5 24 0 t 24 0 t 24 0 t 24 0 V ${top + 6} H12 Z`} fill="#fff" fillOpacity=".28" />
      </g>
      <rect x="12" y="54" width="96" height="158" rx="24" fill={`url(#s${id})`} />
      <rect x="28" y="108" width="64" height="64" rx="6" fill="var(--bg)" fillOpacity=".9" />
      <text x="60" y="134" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" fill="var(--ink)">Quatréa</text>
      <line x1="44" x2="76" y1="142" y2="142" stroke="var(--ink)" strokeOpacity=".3" />
      <text x="60" y="158" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="8.5" fill="var(--ink)">{name}</text>
    </svg>
  );
}
