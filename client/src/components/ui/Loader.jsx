export const Loader = ({ label = 'Loading' }) => (
  <div className="loader" role="status"><span className="loader-dot" /><span className="sr-only">{label}</span></div>
);
export const Empty = ({ title, children }) => (
  <div className="empty"><h3>{title}</h3><p className="muted">{children}</p></div>
);
export const Skeleton = ({ h = 320 }) => <div className="skeleton" style={{ height: h }} />;
