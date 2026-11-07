import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Bottle from "../../../components/ui/Bottle";
import { SEASONS, seasonByKey } from "../../../constants/seasons";
import { addToCart } from "../../cart/cartSlice";
import { openCartDrawer, showToast } from "../../ui/uiSlice";
import { money } from "../../../utils/format";

const QUESTIONS = [
  {
    title: "Who are we celebrating?",
    options: [
      { value: "spring", label: "The gentle optimist", hint: "Fresh beginnings", season: "spring" },
      { value: "summer", label: "The open-air person", hint: "Always near the water", season: "summer" },
      { value: "autumn", label: "The thoughtful host", hint: "Warm light, long evenings", season: "autumn" },
      { value: "winter", label: "The quiet romantic", hint: "A little warmth, always", season: "winter" },
    ],
  },
  {
    title: "What do they reach for?",
    options: [
      { value: "light", label: "Something light", hint: "Airy, green and easy", season: "spring" },
      { value: "bright", label: "Something bright", hint: "Citrus, a little lift", season: "summer" },
      { value: "deep", label: "Something with depth", hint: "Fruit, woods, amber", season: "autumn" },
      { value: "soft", label: "Something soft", hint: "Close, calm and lasting", season: "winter" },
    ],
  },
  {
    title: "What should the gift feel like?",
    options: [
      { value: "personal", label: "Personal", hint: "One scent, chosen with care", season: "spring" },
      { value: "surprise", label: "A little surprise", hint: "Two moods to discover", season: "summer" },
      { value: "ritual", label: "A small ritual", hint: "Something made for slow days", season: "autumn" },
      { value: "keepsake", label: "A keepsake", hint: "A bottle to keep close", season: "winter" },
    ],
  },
];

export default function GiftFinder() {
  const perfumes = useSelector((state) => state.perfumes.items);
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [wrapped, setWrapped] = useState(false);
  const selected = answers[step];
  const season = useMemo(() => {
    const counts = answers.reduce((total, item) => ({ ...total, [item]: (total[item] || 0) + 1 }), {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "spring";
  }, [answers]);
  const pick = (value) => setAnswers((current) => [...current.slice(0, step), value]);
  const gifts = perfumes.filter((perfume) => perfume.season === season).slice(0, 2);
  const addPair = () => {
    gifts.forEach((perfume) => dispatch(addToCart({ perfume, qty: 1 })));
    dispatch(showToast("Your little pairing is in the bag."));
    dispatch(openCartDrawer());
  };
  const giftTotal = gifts.reduce((sum, perfume) => sum + perfume.price, 0);

  return (
    <main className="gift-page">
      <header className="container gift-intro">
        <p className="hero-kicker">The considered gift</p>
        <h1 className="h1">A little <em>something,</em><br />just for them.</h1>
        <p className="lead muted">Three small questions to make a thoughtful choice feel easy.</p>
      </header>
      <section className="gift-workspace container">
        <div className="gift-side-note"><span>Q</span><p>A good gift says<br />“I thought of you.”</p></div>
        <div className={`gift-card ${wrapped ? "is-unwrapped" : ""}`}>
          <AnimatePresence mode="wait">
            {!wrapped ? (
              <motion.div key={`q-${step}`} className="gift-question" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                <div className="gift-progress"><span>QUESTION 0{step + 1} / 03</span><span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span></div>
                <div className="finder-progress-track"><span style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} /></div>
                <h2>{QUESTIONS[step].title}</h2>
                <div className="gift-options">
                  {QUESTIONS[step].options.map((option, index) => (
                    <button className={`gift-option ${selected === option.season ? "selected" : ""}`} key={option.value} onClick={() => pick(option.season)} aria-pressed={selected === option.season}>
                      <span>0{index + 1}</span><strong>{option.label}</strong><small>{option.hint}</small>
                    </button>
                  ))}
                </div>
                <div className="finder-controls">
                  <button className="link" disabled={!step} onClick={() => setStep((current) => current - 1)}>{step ? "← Previous" : " "}</button>
                  <button className="btn" disabled={!selected} onClick={() => step === QUESTIONS.length - 1 ? setWrapped(true) : setStep((current) => current + 1)}>
                    {step === QUESTIONS.length - 1 ? "Unwrap the idea" : "Next question"} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="gift-result" className="gift-result" initial={{ opacity: 0, scale: 0.94, rotateX: -8 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ type: "spring", stiffness: 120, damping: 16 }}>
                <p className="hero-kicker">A gift with their name on it</p>
                <h2>{seasonByKey[season]?.name}, <em>wrapped.</em></h2>
                <p className="muted">A small pairing for someone who loves {SEASONS.find((item) => item.key === season)?.notes[0].toLowerCase()}.</p>
                <div className="gift-pair">
                  {gifts.map((perfume, index) => (
                    <Link key={perfume._id} to={`/collection/${perfume.slug}`} className={`gift-perfume gift-perfume-${index}`} style={{ "--season": perfume.accent }}>
                      <span className="gift-ribbon" aria-hidden="true" />
                      <Bottle color={perfume.accent} name={perfume.name} height={180} />
                      <strong>{perfume.name}</strong>
                      <small>{seasonByKey[perfume.season]?.name}</small>
                    </Link>
                  ))}
                </div>
                <p className="gift-set-note">THE LITTLE DISCOVERY PAIR · {gifts.length} SCENTS TO EXPLORE</p>
                <div className="gift-result-actions">
                  <button className="btn btn-ghost" onClick={addPair}>Add the pair · {money(giftTotal)}</button>
                  <Link className="btn" to={`/collection/${gifts[0]?.slug}`}>Explore the gift <span aria-hidden="true">↗</span></Link>
                  <button className="link" onClick={() => { setAnswers([]); setStep(0); setWrapped(false); }}>Start again</button>
                </div>
                <p className="muted small gift-disclaimer">A curated idea, not a purchasable gift set. Add gift services when the shop is connected.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
