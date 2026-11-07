import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    number: "01",
    name: "Gather",
    title: "We begin where the plant begins.",
    text: "A material has its own season. We pay attention to when a blossom opens, when the peel is bright, and when a leaf gives up its green.",
    detail: "HARVEST / WHEN IT IS READY",
    mark: "atelier-sun",
  },
  {
    number: "02",
    name: "Draw out",
    title: "Keep only what the material gives.",
    text: "Steam, time or careful pressing brings a different part of a raw material into focus. The method follows the thing, never the other way round.",
    detail: "EXTRACTION / A GENTLE HAND",
    mark: "atelier-drop",
  },
  {
    number: "03",
    name: "Compose",
    title: "Let the notes find their order.",
    text: "A bright opening, a changing heart, something that stays. The blend is built in small trials and worn before it is named.",
    detail: "BLENDING / SMALL TRIALS",
    mark: "atelier-orbit",
  },
  {
    number: "04",
    name: "Rest",
    title: "Some things only happen in stillness.",
    text: "The composition is left to settle, then returned to. If a note still has something to say, we listen. If not, we begin again.",
    detail: "AGEING / PATIENCE IS PART OF THE FORMULA",
    mark: "atelier-moon",
  },
  {
    number: "05",
    name: "Finish",
    title: "Made ready to leave the atelier.",
    text: "A final check, a careful fill, a label placed by hand. A small ritual before the fragrance becomes part of someone else’s day.",
    detail: "BOTTLING / ONE AT A TIME",
    mark: "atelier-bottle",
  },
];

export default function Atelier() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="atelier-page">
      <header className="container atelier-intro">
        <p className="hero-kicker">Inside the house</p>
        <h1 className="h1">Made slowly.<br /><em>Meant to be worn.</em></h1>
        <p className="lead muted">A fragrance is made of materials, yes. It is also made of listening, waiting and beginning again.</p>
      </header>
      <section ref={ref} className="atelier-timeline" aria-label="How a fragrance is made">
        <div className="atelier-line" aria-hidden="true"><motion.span style={{ scaleY }} /></div>
        {STEPS.map((step, index) => (
          <article className={`atelier-step ${index % 2 ? "atelier-step-reverse" : ""}`} key={step.number}>
            <div className="atelier-step-copy">
              <span className="atelier-step-number">{step.number} <i>—</i> {step.name}</span>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
              <span className="atelier-step-detail">{step.detail}</span>
            </div>
            <div className={`atelier-illustration ${step.mark}`} aria-hidden="true">
              <span /><span /><span />
            </div>
          </article>
        ))}
      </section>
      <section className="container atelier-close">
        <p>There is no shortcut to a fragrance that feels like itself.</p>
        <Link className="link" to="/collection">Explore what we make <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
