import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Hero from '../components/home/Hero';
import SeasonStory from '../components/home/SeasonStory';
import CollectionStrip from '../components/home/CollectionStrip';
import Craft from '../components/home/Craft';
import { fetchPerfumes } from '../features/perfumes/perfumeSlice';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchPerfumes({ limit: 12 })); }, [dispatch]);

  return (
    <>
      <Hero />
      <SeasonStory />
      <Craft />
      <CollectionStrip />
      <section className="final">
        <div className="container">
          <h2 className="h2">Find the season that smells like you.</h2>
          <p className="muted">Free shipping on orders over $200. Every bottle arrives with a sample of the next season.</p>
          <Link to="/collection" className="btn">Explore the collection</Link>
        </div>
      </section>
    </>
  );
}
