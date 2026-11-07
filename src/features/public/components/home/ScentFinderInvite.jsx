import { Link } from "react-router-dom";
import Icon from "../../../../components/ui/Icon";

const STEPS = [
  ["01", "A feeling", "Choose the scene you want to step into."],
  ["02", "A first note", "Follow the notes you always come back to."],
  ["03", "A soft landing", "Find the dry-down that feels like yours."],
];

export default function ScentFinderInvite() {
  return (
    <section className="finder-invite container" aria-labelledby="finder-invite-title">
      <div className="finder-invite-copy">
        <p className="hero-kicker">A little help from the nose</p>
        <h2 className="h2" id="finder-invite-title">
          Your next scent might be a feeling you haven’t named yet.
        </h2>
        <p className="muted">
          Take the scenic route through three small questions. Leave with a
          fragrance that feels like it found you.
        </p>
        <Link to="/discover" className="btn btn-ghost">
          Find your scent <Icon name="arrow" size={17} />
        </Link>
      </div>
      <ol className="finder-invite-steps">
        {STEPS.map(([number, title, detail]) => (
          <li key={number}>
            <span className="finder-invite-number">{number}</span>
            <span className="finder-invite-step-copy">
              <strong>{title}</strong>
              <small>{detail}</small>
            </span>
            <span className="finder-invite-line" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </section>
  );
}
