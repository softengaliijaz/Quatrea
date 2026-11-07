import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PerfumeCard from "../../../components/ui/PerfumeCard";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.cart.wishlist);
  const perfumes = useSelector((state) => state.perfumes.items);
  const saved = perfumes.filter((perfume) => wishlist.includes(perfume._id));

  return (
    <main className="page container wishlist-page">
      <header className="page-head">
        <p className="hero-kicker">A list to come back to</p>
        <h1 className="h1">Kept <em>close.</em></h1>
        <p className="lead muted">Your saved fragrances stay on this device.</p>
      </header>
      {saved.length ? (
        <div className="grid">{saved.map((perfume) => <PerfumeCard key={perfume._id} perfume={perfume} />)}</div>
      ) : (
        <div className="wishlist-empty">
          <span aria-hidden="true">♡</span>
          <h2>Nothing saved just yet.</h2>
          <p className="muted">When a fragrance catches your eye, keep it here.</p>
          <Link to="/collection" className="btn btn-ghost">Wander through the collection</Link>
        </div>
      )}
    </main>
  );
}
