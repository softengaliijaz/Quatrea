import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import SeasonStory from '../components/home/SeasonStory';
import CraftText from '../components/home/CraftText';
import CollectionStrip from '../components/home/CollectionStrip';
import QuizTeaser from '../components/home/QuizTeaser';
import JournalPreview from '../components/home/JournalPreview';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('');
  return (
    <>
      <Hero />
      <SeasonStory />
      <CraftText />
      <CollectionStrip />
      <QuizTeaser />
      <JournalPreview />
      <section className="wrap py-[10vh] text-center">
        <h2 className="t-h2">Find the season that smells like you.</h2>
        <p className="mx-auto mb-6 text-muted">Free shipping on orders over $200. Every bottle arrives with a sample of the next season.</p>
        <Link to="/collection" className="btn">Explore the collection</Link>
      </section>
    </>
  );
}
