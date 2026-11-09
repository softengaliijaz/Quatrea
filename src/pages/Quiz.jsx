import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Bottle from '../components/common/Bottle';
import SeasonWorld from '../components/perfume/SeasonWorld';
import useShop from '../hooks/useShop';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { QUESTIONS } from '../data/quiz';
import { SEASONS, seasonByKey } from '../data/seasons';
import { PERFUMES } from '../data/perfumes';

// Adds up the points of every chosen answer and returns the season with the most.
const scoreAnswers = (answers) => {
  const tally = Object.fromEntries(SEASONS.map((s) => [s.key, 0]));
  answers.forEach((a, i) => Object.entries(QUESTIONS[i].options[a].points).forEach(([k, v]) => { tally[k] += v; }));
  const winner = SEASONS.reduce((best, s) => (tally[s.key] > tally[best.key] ? s : best), SEASONS[0]);
  return { tally, winner };
};

export default function Quiz() {
  useDocumentTitle('Find your season');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { add } = useShop();
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];

  const choose = (index) => { setAnswers([...answers, index]); setStep(step + 1); };
  const back = () => { setAnswers(answers.slice(0, -1)); setStep(step - 1); };
  const restart = () => { setAnswers([]); setStep(0); };

  const result = done ? scoreAnswers(answers) : null;
  const perfume = result && PERFUMES.find((p) => p.id === result.winner.perfumeId);
  const season = result && seasonByKey[result.winner.key];

  return (
    <section className="relative min-h-svh overflow-hidden pt-28 pb-16" style={{ '--season': done ? season.color : 'var(--brand)' }}>
      {done && <SeasonWorld season={season.key} color={season.color} />}
      <div className="wrap relative max-w-3xl">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={q.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.4 }}>
              <div className="mb-8" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={step} aria-label="Quiz progress">
                <div className="h-1.5 overflow-hidden rounded-full bg-line"><motion.div className="h-full bg-brand" initial={false} animate={{ width: `${(step / QUESTIONS.length) * 100}%` }} /></div>
                <p className="mt-2 text-sm text-muted">Question {step + 1} of {QUESTIONS.length}</p>
              </div>
              <h1 className="t-h1 !text-[clamp(2rem,5vw,3.4rem)]">{q.text}</h1>
              <div className="mt-8 grid gap-3">
                {q.options.map((o, i) => (
                  <motion.button key={o.label} whileHover={{ x: 8 }} className="rounded-2xl border border-line bg-surface p-5 text-left text-lg transition-colors hover:border-brand" onClick={() => choose(i)}>{o.label}</motion.button>
                ))}
              </div>
              {step > 0 && <button className="link mt-6" onClick={back}>Back to the previous question</button>}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid items-center gap-8 text-center md:grid-cols-2 md:text-left">
              <div className="grid place-items-center"><Bottle color={perfume.accent} name={perfume.name} height={380} className="h-[300px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)] md:h-[380px]" /></div>
              <div>
                <p className="t-season">Your season is {season.name.toLowerCase()}</p>
                <h1 className="t-h1">{perfume.name}</h1>
                <p className="t-lead mb-4">{perfume.tagline}</p>
                <ul className="mb-6 flex flex-wrap justify-center gap-2 md:justify-start">{[...perfume.notes.top, ...perfume.notes.heart, ...perfume.notes.base].map((n) => <li key={n} className="tag">{n}</li>)}</ul>
                <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                  <button className="btn btn-season" onClick={() => add(perfume, 50)}>Add to bag</button>
                  <Link to={`/collection/${perfume.slug}`} className="btn btn-ghost">See the fragrance</Link>
                  <button className="btn btn-ghost" onClick={restart}>Retake the quiz</button>
                </div>
                <div className="mt-8 grid gap-2" aria-label="Your match by season">
                  {SEASONS.map((s) => (
                    <div key={s.key} className="grid grid-cols-[70px_1fr] items-center gap-3 text-sm"><span className="text-left">{s.name}</span>
                      <div className="h-2 overflow-hidden rounded-full bg-line"><motion.div className="h-full rounded-full" style={{ background: s.color }} initial={{ width: 0 }} animate={{ width: `${(result.tally[s.key] / 10) * 100}%` }} transition={{ duration: 0.8, delay: 0.3 }} /></div></div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
