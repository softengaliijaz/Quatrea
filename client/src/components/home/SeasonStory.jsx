import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Bottle from "../ui/Bottle";
import { SEASONS } from "../../constants/seasons";

const MOTES = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 37) % 100,
  d: 9 + ((i * 7) % 9),
  s: 6 + ((i * 5) % 14),
  delay: -((i * 3) % 11),
}));

// Pinned scrollytelling: the whole page takes on the colour of the season you are scrolling through.
export default function SeasonStory() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setIdx(Math.min(SEASONS.length - 1, Math.floor(v * SEASONS.length))),
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const bottleY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const season = SEASONS[idx];
  const motes = useMemo(() => MOTES, []);

  return (
    <section
      id="year"
      ref={ref}
      className="story"
      aria-label="The four seasons"
    >
      <div
        className="story-sticky"
        style={{ "--season": season.color }}
        data-season={season.key}
      >
        <div className="story-bg" aria-hidden="true">
          {motes.map((m, i) => (
            <span
              key={i}
              className="mote"
              style={{
                left: `${m.x}%`,
                width: m.s,
                height: m.s,
                animationDuration: `${m.d}s`,
                animationDelay: `${m.delay}s`,
              }}
            />
          ))}
        </div>

        <ol className="story-rail" aria-label="Seasons">
          {SEASONS.map((s, i) => (
            <li
              key={s.key}
              className={i === idx ? "on" : ""}
              style={{ "--c": s.color }}
            >
              <span className="rail-dot" />
              <span className="rail-name">{s.name}</span>
            </li>
          ))}
        </ol>

        <div className="container story-grid">
          <div className="story-copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={season.key}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45 }}
              >
                <p className="story-season">{season.name}</p>
                <h2 className="story-title">{season.headline}</h2>
                <p className="story-text">{season.text}</p>
                <ul className="chips">
                  {season.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                <Link
                  to={`/collection/${season.slug}`}
                  className="btn btn-season"
                >
                  Meet {season.perfume}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div className="story-art" style={{ rotate, y: bottleY }}>
            <div className="story-halo" aria-hidden="true" />
            <Bottle color={season.color} name={season.perfume} height={440} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
