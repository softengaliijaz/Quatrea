import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, useScroll, useTransform } from "framer-motion";
import Bottle from "../../../../components/ui/Bottle";
import { SEASONS } from "../../../../constants/seasons";
import { money } from "../../../../utils/format";

// Vertical scroll drives a horizontal strip of the four fragrances.
export default function CollectionStrip() {
  const ref = useRef(null);
  const items = useSelector((state) => state.perfumes.items);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-62%"]);

  return (
    <section ref={ref} className="strip" aria-label="The collection">
      <div className="strip-sticky">
        <div className="container strip-head">
          <h2 className="h2">One bottle for every season</h2>
          <Link to="/collection" className="link">
            See the full collection
          </Link>
        </div>
        <motion.div className="strip-track" style={{ x }}>
          {SEASONS.map((s) => {
            const p = items.find((i) => i.season === s.key);
            return (
              <Link
                key={s.key}
                to={`/collection/${s.slug}`}
                className="strip-card"
                style={{ "--season": s.color }}
              >
                <Bottle color={s.color} name={s.perfume} height={300} />
                <div>
                  <p className="pcard-season">{s.name}</p>
                  <h3>{s.perfume}</h3>
                  <p className="muted">{s.notes.join(", ")}</p>
                  {p && <strong>{money(p.price)}</strong>}
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
