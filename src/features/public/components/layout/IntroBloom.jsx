import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COLORS = ["var(--spring)", "var(--summer)", "var(--autumn)", "var(--winter)"];

function hasSeenIntro() {
  try {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return sessionStorage.getItem("qt-intro-seen") === "yes";
  } catch (error) {
    console.warn("Intro preference could not be read for this session.", error);
    return true;
  }
}

export default function IntroBloom() {
  const [visible, setVisible] = useState(() => !hasSeenIntro());

  useEffect(() => {
    if (!visible) return undefined;
    try {
      sessionStorage.setItem("qt-intro-seen", "yes");
    } catch (error) {
      console.warn("Intro preference could not be saved for this session.", error);
    }
    const timer = window.setTimeout(() => setVisible(false), 1350);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-bloom"
          role="status"
          aria-label="Welcome to Quatréa"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="intro-bloom-mark" aria-hidden="true">
            {COLORS.map((color, index) => (
              <motion.i
                key={color}
                style={{ "--season": color }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.78 }}
                transition={{ delay: index * 0.09, duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
              />
            ))}
          </div>
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}>
            Quatréa
          </motion.span>
          <button type="button" onClick={() => setVisible(false)}>Skip intro</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
