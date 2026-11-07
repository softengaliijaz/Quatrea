import { useState } from "react";
import { motion } from "framer-motion";

const STORES = [
  { city: "Paris", district: "Le Marais", address: "18 Rue de Bretagne", detail: "A quiet room behind the flower market.", x: 48, y: 29, season: "spring" },
  { city: "Grasse", district: "Old Town", address: "4 Place aux Aires", detail: "A small counter in the town where perfumery lives.", x: 51, y: 44, season: "summer" },
  { city: "Tokyo", district: "Daikanyama", address: "12 Sarugakucho", detail: "A little pause on a tree-lined street.", x: 79, y: 35, season: "autumn" },
  { city: "New York", district: "West Village", address: "36 Bleecker Street", detail: "An atelier window, tucked between old bookshops.", x: 26, y: 39, season: "winter" },
];

export default function Stores() {
  const [active, setActive] = useState(0);
  const location = STORES[active];
  return (
    <main className="stores-page">
      <header className="container stores-heading">
        <p className="hero-kicker">Find a little room to explore</p>
        <h1 className="h1">The house, <em>elsewhere.</em></h1>
        <p className="lead muted">Four imaginary doors, in four cities that know how to take their time.</p>
      </header>
      <section className="container stores-layout" aria-label="Boutique locations">
        <div className="stores-map" aria-label="Illustrated map of boutique locations">
          <span className="map-land map-land-one" /><span className="map-land map-land-two" /><span className="map-land map-land-three" />
          <svg className="map-route" viewBox="0 0 100 60" aria-hidden="true"><path d="M26 39 Q35 14 48 29 T51 44 Q67 51 79 35" /></svg>
          {STORES.map((store, index) => (
            <button type="button" className={`store-pin ${active === index ? "active" : ""}`} key={store.city} style={{ left: `${store.x}%`, top: `${store.y}%`, "--season": `var(--${store.season})` }} onClick={() => setActive(index)} aria-label={`View ${store.city} boutique`} aria-pressed={active === index}>
              <span /><small>{store.city}</small>
            </button>
          ))}
          <div className="map-caption"><span>48°N</span> A FEW PLACES, A LITTLE CLOSER <span>35°N</span></div>
        </div>
        <div className="stores-list">
          <div className="stores-list-heading"><span>THE ATELIER DOORS</span><span>04</span></div>
          {STORES.map((store, index) => (
            <button type="button" className={`store-row ${active === index ? "active" : ""}`} key={store.city} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} aria-pressed={active === index}>
              <span className="store-row-index">0{index + 1}</span>
              <span className="store-row-copy"><strong>{store.city}</strong><small>{store.district}</small></span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
          <motion.article className="store-address" key={location.city} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="hero-kicker">A door in {location.city}</p>
            <h2>{location.address}</h2>
            <p>{location.detail}</p>
            <span>FICTIONAL BOUTIQUE / OPEN IN OUR IMAGINATION</span>
          </motion.article>
        </div>
      </section>
    </main>
  );
}
