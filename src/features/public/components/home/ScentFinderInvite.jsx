import { Link } from "react-router-dom";
import Icon from "../../../../components/ui/Icon";
import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  ["01", "A feeling", "Choose the scene you want to step into."],
  ["02", "A first note", "Follow the notes you always come back to."],
  ["03", "A soft landing", "Find the dry-down that feels like yours."],
];

export default function ScentFinderInvite() {
  const reduceMotion = useReducedMotion();
  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };
  const steps = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.16 } },
  };
  const words = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
  };

  return (
    <section className="finder-invite container" aria-labelledby="finder-invite-title">
      <div className="finder-invite-copy">
        <motion.p
          className="hero-kicker"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          A little help from the nose
        </motion.p>
        <motion.h2
          className="h2"
          id="finder-invite-title"
          aria-label="Your next scent might be a feeling you haven’t named yet."
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.045 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          {"Your next scent might be a feeling you haven’t named yet.".split(" ").map((word, index) => (
            <motion.span key={`${word}-${index}`} variants={words} aria-hidden="true">
              {word}{" "}
            </motion.span>
          ))}
        </motion.h2>
        <motion.p
          className="muted"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          Take the scenic route through three small questions. Leave with a
          fragrance that feels like it found you.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/discover" className="btn btn-ghost">
            Find your scent <Icon name="arrow" size={17} />
          </Link>
        </motion.div>
      </div>
      <motion.ol
        className="finder-invite-steps"
        variants={steps}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        {STEPS.map(([number, title, detail]) => (
          <motion.li key={number} variants={fadeUp} transition={{ duration: 0.55 }}>
            <span className="finder-invite-number">{number}</span>
            <span className="finder-invite-step-copy">
              <strong>{title}</strong>
              <small>{detail}</small>
            </span>
            <span className="finder-invite-line" aria-hidden="true" />
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
