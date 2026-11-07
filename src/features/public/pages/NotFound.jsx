import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page container center">
      <h1 className="h1 big">404</h1>
      <p className="lead muted">This page has drifted off with the season.</p>
      <Link to="/" className="btn">
        Back to the start
      </Link>
    </main>
  );
}
