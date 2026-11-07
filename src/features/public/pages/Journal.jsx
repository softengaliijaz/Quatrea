import { Link } from "react-router-dom";
import { JOURNAL } from "../../../data/journal";
import TypewriterText from "../../../components/ui/TypewriterText";

export default function Journal() {
  return (
    <main className="journal-page">
      <header className="container journal-heading">
        <p className="hero-kicker">Letters from a small perfume house</p>
        <h1 className="h1">
          The <em><TypewriterText>Journal.</TypewriterText></em>
        </h1>
        <p className="lead muted">
          <TypewriterText delay={0.3}>
            On wearing, making and paying attention to the small things.
          </TypewriterText>
        </p>
      </header>
      <section className="container journal-list" aria-label="Journal articles">
        {JOURNAL.map((article, index) => (
          <article className={`journal-entry ${index === 0 ? "journal-entry-featured" : ""}`} key={article.slug}>
            <span className="journal-number">0{index + 1}</span>
            <div className="journal-entry-body">
              <p>{article.category} <span>·</span> {article.readTime}</p>
              <h2>
                <Link to={`/journal/${article.slug}`}>
                  <TypewriterText delay={index * 0.12}>{article.title}</TypewriterText>
                </Link>
              </h2>
              <p className="muted">
                <TypewriterText delay={index * 0.12 + 0.25}>{article.dek}</TypewriterText>
              </p>
              <Link className="link" to={`/journal/${article.slug}`}>Read the story <span aria-hidden="true">↗</span></Link>
            </div>
            <div className={`journal-entry-mark journal-mark-${index}`} aria-hidden="true"><span>{article.quote}</span></div>
          </article>
        ))}
      </section>
      <div className="container journal-foot"><span>Four notes, for now.</span><Link to="/collection" className="link">Back to the fragrances ↗</Link></div>
    </main>
  );
}
