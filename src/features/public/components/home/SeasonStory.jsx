import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Bottle from "../../../../components/ui/Bottle";
import { SEASONS } from "../../../../constants/seasons";

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
  const [selectedNote, setSelectedNote] = useState(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIdx(Math.min(SEASONS.length - 1, Math.floor(v * SEASONS.length)));
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const bottleY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const season = SEASONS[idx];
  const bottleColor = selectedNote?.color || season.color;
  const motes = useMemo(() => MOTES, []);

  useEffect(() => {
    setSelectedNote(null);
  }, [idx]);
  const selectSeason = (index) => {
    setIdx(index);
    const section = ref.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = section.offsetHeight - window.innerHeight;
    const target = sectionTop + scrollDistance * ((index + 0.5) / SEASONS.length);
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { immediate: reduceMotion });
    } else {
      window.scrollTo({
        top: target,
        behavior: reduceMotion ? "instant" : "smooth",
      });
    }
  };

  return (
    <section
      id="year"
      ref={ref}
      className="story"
      aria-label="The four seasons"
    >
      <div
        className="story-sticky"
        style={{ "--season": season.color, "--bottle-color": bottleColor }}
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
            <li key={s.key} className={i === idx ? "on" : ""} style={{ "--c": s.color }}>
              <button
                type="button"
                className="rail-season-button"
                onClick={() => selectSeason(i)}
                aria-label={`Show ${s.name}: ${s.perfume}`}
                aria-pressed={i === idx}
              >
                <span className="rail-dot" aria-hidden="true" />
                <span className="rail-name">{s.name}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="container story-grid">
          <div className="story-copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={season.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="story-season">{season.name}</p>
                <h2 className="story-title">{season.headline}</h2>
                <p className="story-text">{season.text}</p>
                <ul className="chips scent-notes" aria-label={`${season.name} fragrance notes`}>
                  {season.notes.map((note, noteIndex) => {
                    const noteColor = season.noteColors[noteIndex];
                    const noteInk = season.noteTextColors[noteIndex];
                    const isSelected = selectedNote?.label === note;
                    return (
                      <li key={note}>
                        <button
                          type="button"
                          className={`chip scent-note-button ${isSelected ? "on" : ""}`}
                          style={{
                            "--c": noteColor,
                            "--note-ink": noteInk,
                          }}
                          onClick={() => setSelectedNote({ label: note, color: noteColor })}
                          aria-pressed={isSelected}
                        >
                          {note}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  to={`/collection/${season.slug}`}
                  className="btn btn-season"
                  style={{ "--season": season.color }}
                >
                  Meet {season.perfume}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div className="story-art" style={{ rotate: reduceMotion ? 0 : rotate, y: reduceMotion ? 0 : bottleY }}>
            <div className="story-halo" aria-hidden="true" />
            <Bottle color={bottleColor} name={season.perfume} height={440} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
