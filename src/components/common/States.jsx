import { Link } from 'react-router-dom';

export function EmptyState({ title, children, action, level = 2 }) {
  const Heading = `h${level}`;
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <Heading className="t-h3">{title}</Heading>
      <p className="mx-auto mb-5 text-muted">{children}</p>
      {action && (action.to ? <Link to={action.to} className="btn">{action.label}</Link> : <button className="btn" onClick={action.onClick}>{action.label}</button>)}
    </div>
  );
}

export const Skeleton = ({ className = 'h-96' }) => <div className={`shimmer rounded-2xl ${className}`} aria-hidden="true" />;
