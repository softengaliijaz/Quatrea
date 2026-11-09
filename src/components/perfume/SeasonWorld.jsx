import { useMemo } from 'react';

const MOTES = Array.from({ length: 18 }, (_, i) => ({ x: (i * 37) % 100, d: 9 + ((i * 7) % 9), s: 6 + ((i * 5) % 14), delay: -((i * 3) % 11) }));

// Ambient background for a perfume's season: petals, bubbles, leaves or snow.
export default function SeasonWorld({ season, color }) {
  const motes = useMemo(() => MOTES, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" data-season={season} style={{ '--season': color }} aria-hidden="true">
      {motes.map((m, i) => <span key={i} className="mote" style={{ left: `${m.x}%`, width: m.s, height: m.s, animationDuration: `${m.d}s`, animationDelay: `${m.delay}s` }} />)}
    </div>
  );
}
