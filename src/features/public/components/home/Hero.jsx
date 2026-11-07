import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Bottle from "../../../../components/ui/Bottle";
import Icon from "../../../../components/ui/Icon";
import { SEASONS } from "../../../../constants/seasons";
import { showToast, toggleSound } from "../../../ui/uiSlice";

const HEIGHTS = [250, 310, 290, 270];
const WORD = "Quatréa".split("");

export default function Hero() {
  const [scene, setScene] = useState(0);
  const reduceMotion = useReducedMotion();
  const soundEnabled = useSelector((state) => state.ui.soundEnabled);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const { scrollY } = useScroll();
  const lift = [
    useTransform(scrollY, [0, 700], [0, -40]),
    useTransform(scrollY, [0, 700], [0, -110]),
    useTransform(scrollY, [0, 700], [0, -70]),
    useTransform(scrollY, [0, 700], [0, -150]),
  ];
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const oscillator = audioRef.current?.oscillator;
    if (oscillator) {
      oscillator.frequency.setTargetAtTime(
        [110, 146.83, 98, 130.81][scene],
        audioRef.current.context.currentTime,
        0.6,
      );
    }
  }, [scene]);

  useEffect(() => () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.oscillator.stop();
    void audio.context.close();
  }, []);

  const toggleAmbient = async () => {
    if (soundEnabled) {
      const audio = audioRef.current;
      audioRef.current = null;
      dispatch(toggleSound());
      if (audio) {
        audio.oscillator.stop();
        await audio.context.close();
      }
      return;
    }

    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) {
      dispatch(showToast("Ambient sound is not available in this browser."));
      return;
    }

    try {
      const context = new Context();
      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      const volume = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = [110, 146.83, 98, 130.81][scene];
      filter.type = "lowpass";
      filter.frequency.value = 240;
      volume.gain.value = 0.008;
      oscillator.connect(filter);
      filter.connect(volume);
      volume.connect(context.destination);
      oscillator.start();
      audioRef.current = { context, oscillator };
      dispatch(toggleSound());
    } catch (error) {
      console.warn("Could not start the ambient tone.", error);
      dispatch(showToast("Ambient sound could not be started."));
    }
  };

  return (
    <section className="hero" data-scene={SEASONS[scene].key} style={{ "--scene": SEASONS[scene].color }}>
      <div className="hero-wash" aria-hidden="true" />
      <motion.div className="container hero-inner" style={{ opacity: reduceMotion ? 1 : fade }}>
        <p className="hero-kicker">Four fragrances, shaped by the year</p>
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
          {SEASONS[scene].headline} Find the scent that feels like this part of your year.
        </motion.p>
      </motion.div>

      <div className="hero-bottles">
        {SEASONS.map((s, i) => (
          <motion.div
            className="hero-bottle-item"
            key={s.key}
            style={{ y: reduceMotion ? 0 : lift[i], "--season": s.color }}
          >
            <motion.div
              initial={reduceMotion ? false : { y: 160, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.9 + i * 0.12,
                duration: 1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <Link
                to={`/collection/${s.slug}`}
                className="hero-bottle"
              >
                <Bottle color={s.color} name={s.perfume} height={HEIGHTS[i]} />
                <span className="hero-bottle-caption">
                  <span>{s.name}</span>
                  <strong>{s.perfume}</strong>
                </span>
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
        <Link to={`/collection/${SEASONS[scene].slug}`} className="btn">
          Meet {SEASONS[scene].perfume}
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
      <div className="hero-scene-picker" role="group" aria-label="Choose the season in the spotlight">
        <span>IN THE SPOTLIGHT</span>
        {SEASONS.map((season, index) => (
          <button
            type="button"
            className={index === scene ? "active" : ""}
            key={season.key}
            style={{ "--season": season.color }}
            onClick={() => setScene(index)}
            aria-label={`Show ${season.name}`}
            aria-pressed={index === scene}
          >
            <i aria-hidden="true" />
            <span>{season.name}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className={`hero-sound ${soundEnabled ? "active" : ""}`}
        onClick={toggleAmbient}
        aria-pressed={soundEnabled}
      >
        <Icon name="sound" size={16} />
        {soundEnabled ? "Ambient tone on" : "Listen to the season"}
      </button>
    </section>
  );
}
