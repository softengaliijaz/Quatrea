const PATHS = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  bag: (
    <>
      <path d="M5 8h14l-1 12H6L5 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  star: (
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
  ),
  trash: <path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  map: (
    <>
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
      <path d="M9 3v15M15 6v15" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z" />
      <path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M8 7h8M8 10h7" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6L4.5 19a1.4 1.4 0 0 0 1.2 2h12.6a1.4 1.4 0 0 0 1.2-2L14 9V3" />
      <path d="M7 16h10" />
    </>
  ),
  gift: (
    <>
      <path d="M3 10h18v11H3zM2 6h20v4H2zM12 6v15" />
      <path d="M12 6H7.5a2.5 2.5 0 1 1 2.5-2.5C10 5 12 6 12 6ZM12 6h4.5A2.5 2.5 0 1 0 14 3.5C14 5 12 6 12 6Z" />
    </>
  ),
  sound: (
    <>
      <path d="M4 10v4h4l5 4V6l-5 4z" />
      <path d="M17 9a5 5 0 0 1 0 6M19.5 6.5a9 9 0 0 1 0 11" />
    </>
  ),
};

export default function Icon({
  name,
  size = 20,
  fill = false,
  className = "",
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
