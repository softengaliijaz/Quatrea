import { motion } from "framer-motion";
import Bottle from "../components/ui/Bottle";
import { SEASONS } from "../constants/seasons";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function About() {
  return (
    <section className="page container about">
      <motion.h1 className="h1 big" {...reveal}>
        A year, bottled four ways.
      </motion.h1>
      <motion.p className="lead" {...reveal}>
        Quatréa began with a simple question: what would the year smell like if
        each season had one perfume, and only one? We answered it with four
        blends, each composed around a single feeling.
      </motion.p>
      <div className="about-seasons">
        {SEASONS.map((s, i) => (
          <motion.article
            key={s.key}
            className={`about-row ${i % 2 ? "flip" : ""}`}
            style={{ "--season": s.color }}
            {...reveal}
          >
            <div className="about-art">
              <div className="story-halo" aria-hidden="true" />
              <Bottle color={s.color} name={s.perfume} height={260} />
            </div>
            <div>
              <h2 className="h2">
                {s.perfume}, for {s.name.toLowerCase()}
              </h2>
              <p>{s.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div className="values" {...reveal}>
        <div>
          <h3>Small batches</h3>
          <p className="muted">
            Five hundred bottles per season, so every one is blended and checked
            by hand.
          </p>
        </div>
        <div>
          <h3>Honest materials</h3>
          <p className="muted">
            Natural absolutes where they matter, refined synthetics where they
            are kinder to the planet.
          </p>
        </div>
        <div>
          <h3>Slow ageing</h3>
          <p className="muted">
            Each blend rests for twelve weeks before it is filtered and bottled.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
