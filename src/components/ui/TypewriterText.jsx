import { motion, useReducedMotion } from "framer-motion";

const characterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function TypewriterText({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const text = String(children ?? "").replace(/\s+/g, " ").trim();

  return (
    <motion.span
      className={`typewriter-text ${className}`.trim()}
      aria-label={text}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      animate={reduceMotion ? "visible" : undefined}
      viewport={{ once: true, amount: 0.7 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.018,
          },
        },
      }}
    >
      {Array.from(text).map((character, index) => (
        <motion.span
          key={`${index}-${character}`}
          aria-hidden="true"
          variants={characterVariants}
        >
          {character}
        </motion.span>
      ))}
      {!reduceMotion && <span className="typewriter-caret" aria-hidden="true" />}
    </motion.span>
  );
}
