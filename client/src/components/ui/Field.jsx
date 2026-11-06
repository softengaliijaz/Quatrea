export default function Field({
  label,
  as: Tag = "input",
  error,
  children,
  ...props
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <Tag className="input" {...props}>
        {children}
      </Tag>
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
