import { Link, useParams } from "react-router-dom";
import { useScroll, useSpring, motion } from "framer-motion";
import { JOURNAL } from "../../../data/journal";

export default function JournalArticle() {
  const { slug } = useParams();
  const article = JOURNAL.find((item) => item.slug === slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (!article) {
    return <main className="page container"><h1 className="h1">A page from another notebook.</h1><Link to="/journal" className="link">Back to the journal</Link></main>;
  }

  return (
    <main className="journal-article">
      <motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className="journal-article-head container">
        <Link className="link" to="/journal">← The Journal</Link>
        <p className="hero-kicker">{article.category} <span>·</span> {article.readTime}</p>
        <h1>{article.title}</h1>
        <p className="journal-article-dek">{article.dek}</p>
        <span className="journal-date">{article.date}</span>
      </header>
      <div className="journal-article-art" aria-hidden="true"><span>Q.</span></div>
      <article className="journal-prose">
        <p className="journal-dropcap">{article.body[0]}</p>
        <blockquote>{article.quote}</blockquote>
        {article.body.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <footer><span>End of note</span><Link to="/journal" className="link">Read another <span aria-hidden="true">↗</span></Link></footer>
      </article>
    </main>
  );
}
