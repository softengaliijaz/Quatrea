import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Bottle from "../../../components/ui/Bottle";
import { seasonByKey } from "../../../constants/seasons";

const BLEND_NAMES = [
  "A borrowed afternoon",
  "The hour between",
  "Light through leaves",
  "A room with the windows open",
  "Somewhere, just before evening",
];

export default function LayeringLab() {
  const perfumes = useSelector((state) => state.perfumes.items);
  const [firstId, setFirstId] = useState("eclosion");
  const [secondId, setSecondId] = useState("zenith");
  const [ratio, setRatio] = useState(50);
  const first = perfumes.find((item) => item._id === firstId) || perfumes[0];
  const second = perfumes.find((item) => item._id === secondId) || perfumes[1];
  const nameIndex = (first.name.length + second.name.length + Math.round(ratio / 20)) % BLEND_NAMES.length;
  const sharedNotes = [
    ...first.notes.top,
    ...second.notes.top,
    ...first.notes.heart,
    ...second.notes.heart,
    ...first.notes.base,
    ...second.notes.base,
  ];
  const blendColor = `color-mix(in srgb, ${first.accent} ${ratio}%, ${second.accent})`;
  const colorMix = useMemo(
    () => `color-mix(in srgb, ${first.accent} ${ratio}%, ${second.accent})`,
    [first.accent, ratio, second.accent],
  );
  const firstBlend = Math.round(ratio / 10) * 10;

  return (
    <main className="lab-page">
      <header className="container lab-intro">
        <p className="hero-kicker">The blending table</p>
        <h1 className="h1">Two scents.<br /><em>One little experiment.</em></h1>
        <p className="lead muted">Borrow a note from one bottle, a feeling from another. There is no formula to get right.</p>
      </header>

      <section className="lab-workspace container">
        <div className="lab-stage" style={{ "--blend": blendColor }}>
          <div className="lab-light" aria-hidden="true" />
          <div className="lab-bottles">
            <div className="lab-bottle lab-bottle-one" style={{ "--season": first.accent, "--weight": `${firstBlend}%`, transform: `translateY(${(100 - firstBlend) * 0.35}px) rotate(-4deg)` }}>
              <Bottle color={first.accent} name={first.name} height={300} />
              <span>{first.name}</span>
            </div>
            <div className="lab-plus" aria-hidden="true">+</div>
            <div className="lab-bottle lab-bottle-two" style={{ "--season": second.accent, "--weight": `${100 - firstBlend}%`, transform: `translateY(${firstBlend * 0.35}px) rotate(4deg)` }}>
              <Bottle color={second.accent} name={second.name} height={300} />
              <span>{second.name}</span>
            </div>
          </div>
          <div className="lab-blend">
            <span className="lab-blend-rule" />
            <p>A NEW LITTLE WORLD</p>
            <h2>{BLEND_NAMES[nameIndex]}</h2>
            <div className="lab-note-cloud">
              {[...new Set(sharedNotes)].slice(0, 5).map((note) => <span key={note}>{note}</span>)}
            </div>
          </div>
        </div>

        <div className="lab-controls">
          <div className="lab-selects">
            <label className="field">
              <span>Start with</span>
              <select className="input" value={firstId} onChange={(event) => setFirstId(event.target.value)}>
                {perfumes.map((item) => <option key={item._id} value={item._id}>{item.name} · {seasonByKey[item.season]?.name}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Then add</span>
              <select className="input" value={secondId} onChange={(event) => setSecondId(event.target.value)}>
                {perfumes.map((item) => <option key={item._id} value={item._id}>{item.name} · {seasonByKey[item.season]?.name}</option>)}
              </select>
            </label>
          </div>
          <label className="lab-slider-label" htmlFor="blend-ratio">
            <span>Make it yours</span>
            <span>{first.name} <strong>{ratio}%</strong> <i>·</i> <strong>{100 - ratio}%</strong> {second.name}</span>
          </label>
          <input
            id="blend-ratio"
            className="lab-slider"
            type="range"
            min="0"
            max="100"
            step="5"
            value={ratio}
            style={{ "--mix": colorMix, background: `linear-gradient(90deg, ${first.accent}, ${second.accent})` }}
            onChange={(event) => setRatio(Number(event.target.value))}
            aria-label={`Blend ratio: ${ratio}% ${first.name} and ${100 - ratio}% ${second.name}`}
          />
          <p className="muted small lab-note">An imaginative exercise in notes, not a physical formula. We never mix or alter the fragrances themselves.</p>
          <Link to={`/collection/${first.slug}`} className="link">Meet {first.name} <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
