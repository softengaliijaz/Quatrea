import { useId } from 'react';

// Labelled form control with an accessible inline error.
export default function Field({ label, error, as: Tag = 'input', children, ...props }) {
  const id = useId();
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm text-muted">{label}</label>
      <Tag id={id} className="input" aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} {...props}>{children}</Tag>
      {error && <p id={`${id}-e`} className="field-error" role="alert">{error}</p>}
    </div>
  );
}
