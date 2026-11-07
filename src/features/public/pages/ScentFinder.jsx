import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Bottle from "../../../components/ui/Bottle";
import Icon from "../../../components/ui/Icon";
import { seasonByKey } from "../../../constants/seasons";
import useShop from "../../../hooks/useShop";
import { money } from "../../../utils/format";
import { QUIZ_QUESTIONS } from "../../../data/quizQuestions";
import { showToast } from "../../ui/uiSlice";

function scorePerfume(perfume, answers) {
  return (
    Object.values(answers).filter((season) => season === perfume.season).length +
    (perfume.featured ? 0.01 : 0)
  );
}

export default function ScentFinder() {
  const perfumes = useSelector((state) => state.perfumes.items);
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { add, wish, isWished } = useShop();
  const reduceMotion = useReducedMotion();
  const question = QUIZ_QUESTIONS[step];
  const selected = answers[step];

  const matches = useMemo(() => {
    if (!showResults) return [];
    return [...perfumes]
      .sort((a, b) => scorePerfume(b, answers) - scorePerfume(a, answers))
      .slice(0, 3);
  }, [answers, perfumes, showResults]);

  const choose = (value) =>
    setAnswers((current) => ({ ...current, [step]: value }));
  const restart = () => {
    setAnswers({});
    setStep(0);
    setShowResults(false);
  };
  const shareResult = async () => {
    const perfume = matches[0];
    if (!perfume) return;
    const shareData = {
      title: "My Quatréa scent",
      text: `My season is ${seasonByKey[perfume.season]?.name}. Meet ${perfume.name}: ${perfume.tagline}`,
      url: `${window.location.origin}/discover`,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        dispatch(showToast("Your scent card is ready to share."));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        dispatch(showToast("Sharing is not available in this browser."));
      }
    }
  };

  return (
    <main className="finder-page">
      <motion.header
        className="finder-intro container"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-kicker">A small study in what you love</p>
        <h1 className="h1">Find your <em>season.</em></h1>
        <p className="lead muted">
          Five little choices, no wrong answers. Find the season — and the
          fragrance — that feels a little like you.
        </p>
      </motion.header>

      <motion.section
        className="finder-shell container"
        aria-label="Scent finder"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <aside className="finder-aside">
          <span className="finder-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <p className="finder-aside-label">A year, bottled four ways</p>
          <p className="finder-aside-copy">
            Fragrance is personal. There are no wrong answers here, only a
            starting point.
          </p>
          <div className="finder-aside-rule" />
          <p className="finder-aside-foot">TAKE YOUR TIME <span>·</span> 5 QUESTIONS</p>
        </aside>

        <div className="finder-panel">
          <div className="finder-progress" aria-label={showResults ? "Recommendations ready" : `Question ${step + 1} of ${QUIZ_QUESTIONS.length}`}>
            <span>{showResults ? "YOUR SEASON, FOUND" : `0${step + 1} / 05`}</span>
            <span>{showResults ? "05 / 05" : `0${step + 1} / 05`}</span>
          </div>
          <div className="finder-progress-track" aria-hidden="true">
            <motion.span
              animate={{ width: `${showResults ? 100 : ((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div
                className="finder-results"
                key="results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {matches[0] && (
                  <>
                    <p className="finder-result-kicker">YOUR CLOSEST MATCH</p>
                    <div className="finder-feature">
                      <div className="finder-feature-art" style={{ "--season": matches[0].accent || seasonByKey[matches[0].season]?.color }}>
                        <span className="finder-feature-season">{seasonByKey[matches[0].season]?.name}</span>
                        <Bottle color={matches[0].accent || seasonByKey[matches[0].season]?.color} name={matches[0].name} height={260} />
                        <span className="finder-feature-notes">{matches[0].notes.top.join(" · ")}</span>
                      </div>
                      <div className="finder-feature-copy">
                        <p className="muted small">{matches[0].mood}</p>
                        <h2>{matches[0].name}</h2>
                        <p className="finder-tagline">{matches[0].tagline}</p>
                        <p className="muted small">{matches[0].description}</p>
                        <p className="finder-pyramid">
                          <span>TOP</span> {matches[0].notes.top.join(", ")}<br />
                          <span>HEART</span> {matches[0].notes.heart.join(", ")}<br />
                          <span>BASE</span> {matches[0].notes.base.join(", ")}
                        </p>
                        <div className="finder-result-actions">
                          <button className="btn" onClick={() => add(matches[0])}>
                            Add to bag · {money(matches[0].price)}
                          </button>
                          <button
                            className={`icon-btn finder-wish ${isWished(matches[0]._id) ? "on" : ""}`}
                            onClick={() => wish(matches[0])}
                            aria-label={isWished(matches[0]._id) ? "Remove from wishlist" : "Save to wishlist"}
                            aria-pressed={isWished(matches[0]._id)}
                          >
                            <Icon name="heart" fill={isWished(matches[0]._id)} />
                          </button>
                        </div>
                        <Link className="link finder-detail-link" to={`/collection/${matches[0].slug}`}>
                          Meet {matches[0].name} <span aria-hidden="true">↗</span>
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                <div className="finder-alternates">
                  <p className="finder-alternates-label">A couple of other paths</p>
                  {matches.slice(1).map((perfume) => (
                    <Link key={perfume._id} to={`/collection/${perfume.slug}`} className="finder-alternate">
                      <span className="finder-alternate-dot" style={{ "--season": perfume.accent || seasonByKey[perfume.season]?.color }} />
                      <span><strong>{perfume.name}</strong><small>{seasonByKey[perfume.season]?.name} · {perfume.notes.top.join(", ")}</small></span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
                <div className="finder-result-footer">
                  <button className="link" onClick={restart}>Take the quiz again</button>
                  <button className="link" onClick={shareResult}>Share my result</button>
                  <Link className="link" to="/collection">See all fragrances</Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="finder-question"
                key={step}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.25 }}
              >
                <p className="finder-question-step">0{step + 1} / {QUIZ_QUESTIONS.length} · A QUESTION FOR YOU</p>
                <h2>{question.prompt}</h2>
                <p className="muted">Choose the answer that feels right, not the one you think you should choose.</p>
                <div className="finder-options" role="group" aria-label={question.prompt}>
                  {question.options.map((option, optionIndex) => (
                    <motion.button
                      className={`finder-option ${selected === option.season ? "selected" : ""}`}
                      key={option.label}
                      type="button"
                      style={{ "--option-season": seasonByKey[option.season]?.color }}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        delay: reduceMotion ? 0 : optionIndex * 0.055,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => choose(option.season)}
                      aria-pressed={selected === option.season}
                    >
                      <span className="finder-option-mark">0{optionIndex + 1}</span>
                      <span className="finder-option-copy">
                        <strong>{option.label}</strong>
                        <small>{seasonByKey[option.season]?.name}</small>
                      </span>
                      <span className="finder-option-check" aria-hidden="true">
                        <AnimatePresence mode="wait" initial={false}>
                          {selected === option.season && (
                            <motion.span
                              key="selected"
                              initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={reduceMotion ? undefined : { scale: 0, opacity: 0 }}
                              transition={{ duration: reduceMotion ? 0 : 0.18 }}
                            >
                              ✓
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </motion.button>
                  ))}
                </div>
                <div className="finder-controls">
                  <button className="link finder-back" onClick={() => setStep((current) => current - 1)} disabled={step === 0}>
                    {step > 0 ? "← Previous" : " "}
                  </button>
                  <button
                    className="btn"
                    disabled={!selected}
                    onClick={() => step === QUIZ_QUESTIONS.length - 1 ? setShowResults(true) : setStep((current) => current + 1)}
                  >
                    {step === QUIZ_QUESTIONS.length - 1 ? "Reveal my season" : "Continue"}
                    <Icon name="arrow" size={17} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      <p className="finder-disclaimer container">
        A thoughtful place to start, not a rulebook. The best way to know a scent
        is to wear it.
      </p>
    </main>
  );
}
