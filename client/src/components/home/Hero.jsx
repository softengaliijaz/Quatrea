import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Bottle from "../ui/Bottle";
import { SEASONS } from "../../constants/seasons";

const HEIGHTS = [250, 310, 290, 270];
const WORD = "Quatréa".split("");

export default function Hero() {
  const { scrollY } = useScroll();
  const lift = [
    useTransform(scrollY, [0, 700], [0, -40]),
    useTransform(scrollY, [0, 700], [0, -110]),
    useTransform(scrollY, [0, 700], [0, -70]),
    useTransform(scrollY, [0, 700], [0, -150]),
  ];
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="hero">
      <div className="hero-wash" aria-hidden="true" />
      <motion.div className="container hero-inner" style={{ opacity: fade }}>
        <h1 className="wordmark" aria-label="Quatréa">
          {WORD.map((c, i) => (
            <span className="mask" key={i} aria-hidden="true">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.2 + i * 0.07,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                {c}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Four seasons, four fragrances. Scroll to walk through the year.
        </motion.p>
      </motion.div>

      <div className="hero-bottles">
        {SEASONS.map((s, i) => (
          <motion.div key={s.key} style={{ y: lift[i] }}>
            <motion.div
              initial={{ y: 160, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.9 + i * 0.12,
                duration: 1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <Link
                to={`/collection/${s.slug}`}
                aria-label={`${s.perfume}, the ${s.name.toLowerCase()} fragrance`}
                className="hero-bottle"
              >
                <Bottle color={s.color} name={s.perfume} height={HEIGHTS[i]} />
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="hero-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <Link to="/collection" className="btn">
          Shop the collection
        </Link>
        <a
          href="#year"
          className="btn btn-ghost"
          onClick={(e) => {
            e.preventDefault();
            const t = document.getElementById("year");
            window.__lenis
              ? window.__lenis.scrollTo(t)
              : t.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Begin the year
        </a>
      </motion.div>
    </section>
  );
}
