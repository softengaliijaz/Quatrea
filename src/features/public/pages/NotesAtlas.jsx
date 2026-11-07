import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { INGREDIENTS } from "../../../data/ingredients";
import { SEASONS, seasonByKey } from "../../../constants/seasons";

export default function NotesAtlas() {
  const [season, setSeason] = useState("");
  const [selectedId, setSelectedId] = useState("bergamot");
  const perfumes = useSelector((state) => state.perfumes.items);
  const visible = useMemo(
    () => INGREDIENTS.filter((ingredient) => !season || ingredient.season === season),
    [season],
  );
  const selected = visible.find((ingredient) => ingredient.slug === selectedId) || visible[0];
  const inPerfumes = selected
    ? perfumes.filter((perfume) =>
        Object.values(perfume.notes).flat().some((note) =>
          note.toLocaleLowerCase().includes(selected.name.toLocaleLowerCase()),
        ),
      )
    : [];
  const selectSeason = (key) => {
    setSeason(key);
    if (key) {
      const firstInSeason = INGREDIENTS.find((ingredient) => ingredient.season === key);
      if (firstInSeason) setSelectedId(firstInSeason.slug);
    } else {
      setSelectedId("bergamot");
    }
  };

  return (
    <main className="atlas-page">
      <header className="container atlas-heading">
        <div>
          <p className="hero-kicker">A field guide to the invisible</p>
          <h1 className="h1">The notes <em>atlas.</em></h1>
        </div>
        <p className="lead muted">Every fragrance begins somewhere. Wander through the materials, places and small stories held in a bottle.</p>
      </header>
      <div className="container atlas-filters" role="group" aria-label="Filter notes by season">
        <button className={`chip ${season === "" ? "on" : ""}`} onClick={() => selectSeason("")}>All notes</button>
        {SEASONS.map((item) => (
          <button key={item.key} className={`chip ${season === item.key ? "on" : ""}`} style={{ "--c": item.color }} onClick={() => selectSeason(item.key)}>{item.name}</button>
        ))}
      </div>

      <section className="container atlas-layout" aria-label="Ingredient atlas">
        <div className="atlas-map">
          <div className="atlas-map-lines" aria-hidden="true" />
          {visible.map((ingredient, index) => (
            <button
              key={ingredient.slug}
              type="button"
              className={`atlas-pin atlas-pin-${ingredient.image} ${selected?.slug === ingredient.slug ? "active" : ""}`}
              style={{
                "--index": index,
                "--season": seasonByKey[ingredient.season]?.color,
                left: `${14 + ((index * 37) % 74)}%`,
                top: `${17 + ((index * 53) % 65)}%`,
              }}
              onClick={() => setSelectedId(ingredient.slug)}
              aria-pressed={selected?.slug === ingredient.slug}
            >
              <span className="atlas-pin-dot" />
              <span className="atlas-pin-name">{ingredient.name}</span>
            </button>
          ))}
          <span className="atlas-map-caption">MATERIALS, PLACES & IMPRESSIONS</span>
        </div>

        {selected ? (
          <article className="atlas-detail" key={selected.slug}>
            <div className={`atlas-specimen atlas-specimen-${selected.image}`} style={{ "--season": seasonByKey[selected.season]?.color }}>
              <span>{selected.family}</span>
              <strong>{selected.name}</strong>
              <small>ORIGIN · {selected.origin}</small>
            </div>
            <p className="hero-kicker">{seasonByKey[selected.season]?.name} / {selected.family}</p>
            <h2>{selected.name}</h2>
            <p className="atlas-story">{selected.story}</p>
            <div className="atlas-origin"><span>01</span><p><strong>Where it begins</strong><br />{selected.origin}</p></div>
            <div className="atlas-fragrances">
              <h3>Found in these fragrances</h3>
              {inPerfumes.length ? inPerfumes.map((perfume) => (
                <Link key={perfume._id} to={`/collection/${perfume.slug}`}>
                  <span>{perfume.name}</span><span aria-hidden="true">↗</span>
                </Link>
              )) : <p className="muted small">A note for the next chapter.</p>}
            </div>
          </article>
        ) : (
          <div className="atlas-detail"><p>Select a note to discover its story.</p></div>
        )}
      </section>
      <p className="container atlas-disclaimer">Origins are part of Quatréa’s imagined perfumery world; our ingredient stories are editorial, not sourcing certifications.</p>
    </main>
  );
}
