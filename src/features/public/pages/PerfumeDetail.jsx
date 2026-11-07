import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Bottle from "../../../components/ui/Bottle";
import Icon from "../../../components/ui/Icon";
import Stars from "../../../components/ui/Stars";
import { Empty } from "../../../components/ui/Loader";
import useShop from "../../../hooks/useShop";
import { perfumeBySlug } from "../../../data/perfumes";
import { seasonByKey } from "../../../constants/seasons";
import { money } from "../../../utils/format";

const LAYERS = [
  ["top", "Top", "The first ten minutes"],
  ["heart", "Heart", "The next few hours"],
  ["base", "Base", "What stays on your skin"],
];

export default function PerfumeDetail() {
  const { slug } = useParams();
  const p = useSelector((state) => perfumeBySlug[slug]);
  const { add, wish, isWished } = useShop();
  const [qty, setQty] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    setSelectedNote(null);
  }, [slug]);

  if (!p)
    return (
      <main className="page container">
        <Empty title="Fragrance not found">
          It may have been retired.{" "}
          <Link to="/collection" className="link">
            Back to the collection
          </Link>
        </Empty>
      </main>
    );
  const color = p.accent || seasonByKey[p.season]?.color;
  const season = seasonByKey[p.season];
  const wished = isWished(p._id);

  return (
    <main className="detail" data-season={p.season} style={{ "--season": color }}>
      <div className="container detail-grid">
        <div className="detail-art">
          <div className="story-halo" aria-hidden="true" />
          <motion.div
            initial={{ y: 60, opacity: 0, rotate: -6 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
          >
            <Bottle color={selectedNote?.color || color} name={p.name} height={440} />
          </motion.div>
        </div>

        <div className="detail-info">
          <p className="pcard-season">
            {seasonByKey[p.season]?.name} · {p.sizeMl} ml
          </p>
          <h1 className="h1">{p.name}</h1>
          <p className="lead">{p.tagline}</p>
          <p>{p.description}</p>

          <dl className="pyramid">
            {LAYERS.map(([key, title, hint], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <dt>
                  {title}
                  <span className="muted small">{hint}</span>
                </dt>
                <dd>
                  <div
                    className="detail-note-options"
                    role="group"
                    aria-label={`${title} fragrance notes`}
                  >
                    {(p.notes?.[key] || []).map((note) => {
                      const noteColor = season?.noteColors?.[i] || color;
                      const noteTextColor = season?.noteTextColors?.[i] || "var(--contrast-ink)";
                      const isSelected = selectedNote?.label === note;
                      return (
                        <button
                          key={note}
                          type="button"
                          className={`chip detail-note-button ${isSelected ? "on" : ""}`}
                          style={{ "--c": noteColor, "--note-ink": noteTextColor }}
                          onClick={() => setSelectedNote({ label: note, color: noteColor })}
                          aria-pressed={isSelected}
                        >
                          {note}
                        </button>
                      );
                    })}
                  </div>
                </dd>
              </motion.div>
            ))}
          </dl>

          <div className="buy">
            <strong className="price">{money(p.price)}</strong>
            <div className="qty" aria-label="Quantity">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease"
              >
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                aria-label="Increase"
              >
                +
              </button>
            </div>
            <button
              className="btn"
              disabled={p.stock < 1}
              onClick={() => add(p, qty)}
            >
              {p.stock < 1 ? "Sold out" : "Add to bag"}
            </button>
            <button
              className={`icon-btn wish-inline ${wished ? "on" : ""}`}
              onClick={() => wish(p)}
              aria-pressed={wished}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Icon name="heart" fill={wished} />
            </button>
          </div>
          {p.stock > 0 && p.stock <= 10 && (
            <p className="small warn">Only {p.stock} left in this batch.</p>
          )}
        </div>
      </div>
      <p className="container detail-note muted small">
        Product details are part of this local, frontend-only concept.
      </p>
      <section className="detail-reviews container" aria-labelledby="reviews-title">
        <div className="detail-reviews-heading">
          <div>
            <p className="hero-kicker">A note from someone who wears it</p>
            <h2 id="reviews-title">Worn, then remembered.</h2>
          </div>
          <div className="detail-rating">
            <Stars value={p.ratingAvg} />
            <strong>{p.ratingAvg.toFixed(1)}</strong>
            <span className="muted small">Illustrative sample reviews</span>
          </div>
        </div>
        <div className="detail-review-grid">
          {p.reviews.map((review) => (
            <blockquote key={`${review.author}-${review.title}`} className="detail-review">
              <Stars value={review.rating} size={13} />
              <p>“{review.body}”</p>
              <footer><strong>{review.author}</strong><span>{review.title}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}
