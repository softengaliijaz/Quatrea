import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import SeasonStory from "../components/home/SeasonStory";
import CollectionStrip from "../components/home/CollectionStrip";
import Craft from "../components/home/Craft";
import ScentFinderInvite from "../components/home/ScentFinderInvite";

export default function Home() {
  return (
    <main>
      <Hero />
      <SeasonStory />
      <Craft />
      <ScentFinderInvite />
      <CollectionStrip />
      <section className="final">
        <div className="container">
          <h2 className="h2">Find the season that smells like you.</h2>
          <p className="muted">
            Four originals, and a dozen ways to find your own moment in the
            year.
          </p>
          <Link to="/collection" className="btn">
            Explore the collection
          </Link>
        </div>
      </section>
    </main>
  );
}
