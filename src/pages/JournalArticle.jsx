import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EmptyState } from '../components/common/States';
import Bottle from '../components/common/Bottle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ARTICLES, getArticle } from '../data/journal';
import { seasonByKey } from '../data/seasons';
import { PERFUMES } from '../data/perfumes';

export default function JournalArticle() {
  const { slug } = useParams();
  const article = getArticle(slug);
  useDocumentTitle(article?.title || 'Not found');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 100px', 'end 60%'] });
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (!article) return <section className="page"><EmptyState level={1} title="Story not found" action={{ label: 'Back to the journal', to: '/journal' }}>This article may have moved.</EmptyState></section>;

  const season = seasonByKey[article.season];
  const perfume = PERFUMES.find((p) => p.season === article.season);
  const index = ARTICLES.findIndex((a) => a.slug === slug);
  const next = ARTICLES[(index + 1) % ARTICLES.length];

  return (
    <article className="pt-24" style={{ '--season': season.color }}>
      <div className="sticky top-[68px] z-50 h-1 bg-line"><motion.div className="h-full origin-left bg-[var(--season)]" style={{ scaleX: width }} /></div>
      <div className="wrap max-w-3xl pt-12 pb-16" ref={ref}>
        <p className="t-season"><Link to="/journal" className="hover:underline">Journal</Link> · {season.name} · {article.readMinutes} min read</p>
        <h1 className="t-h1 !text-[clamp(2.4rem,7vw,5rem)]">{article.title}</h1>
        <p className="t-lead mb-10">{article.excerpt}</p>
        {article.body.map((para, i) => (
          <p key={i} className={`mb-6 max-w-none text-[1.2rem] leading-[1.85] ${i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-[var(--season)]' : ''}`}>{para}</p>
        ))}
        <p className="text-sm text-muted">{article.date}</p>

        <div className="mt-12 flex flex-wrap items-center gap-6 rounded-3xl border border-line bg-[color-mix(in_srgb,var(--season)_18%,var(--surface))] p-6">
          <Bottle color={perfume.accent} name={perfume.name} height={120} />
          <div className="flex-1"><p className="t-season">Written for {season.name.toLowerCase()}</p><h2 className="font-display text-3xl">{perfume.name}</h2><p className="mb-3 text-muted">{perfume.tagline}</p><Link to={`/collection/${perfume.slug}`} className="btn btn-sm btn-season">Discover the fragrance</Link></div>
        </div>
        <Link to={`/journal/${next.slug}`} className="mt-10 block border-t border-line pt-6"><span className="text-sm text-muted">Next story</span><span className="block font-display text-3xl hover:text-brand">{next.title}</span></Link>
      </div>
    </article>
  );
}
