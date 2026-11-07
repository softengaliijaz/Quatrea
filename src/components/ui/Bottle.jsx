import { useId } from "react";

// Illustrated bottle, tinted with the fragrance's season colour.
export default function Bottle({
  color = "var(--brand)",
  name = "",
  height = 300,
  className = "",
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 120 220"
      height={height}
      className={`bottle ${className}`}
      role="img"
      aria-label={`${name || "Quatréa"} perfume bottle`}
    >
      <defs>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0"
            className="bottle-stop"
            style={{ stopColor: color }}
            stopOpacity=".95"
          />
          <stop
            offset="1"
            className="bottle-stop"
            style={{ stopColor: color }}
            stopOpacity=".5"
          />
        </linearGradient>
        <linearGradient id={`s${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--pure-white)" stopOpacity=".6" />
          <stop offset=".45" stopColor="var(--pure-white)" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`b${id}`}>
          <rect x="12" y="54" width="96" height="158" rx="24" />
        </clipPath>
      </defs>
      <rect x="44" y="6" width="32" height="32" rx="5" fill="var(--ink)" />
      <path d="M47 8h26v5H47z" fill="var(--pure-white)" fillOpacity=".18" />
      <rect x="51" y="38" width="18" height="16" fill="var(--line)" />
      <rect
        x="12"
        y="54"
        width="96"
        height="158"
        rx="24"
        fill={`url(#l${id})`}
        stroke="var(--ink)"
        strokeOpacity=".25"
      />
      <path
        d="M13 128h94v60a24 24 0 0 1-24 24H37a24 24 0 0 1-24-24z"
        fill={color}
        fillOpacity=".14"
        clipPath={`url(#b${id})`}
      />
      <rect
        x="12"
        y="54"
        width="96"
        height="158"
        rx="24"
        fill={`url(#s${id})`}
      />
      <path d="M22 76v105" stroke="var(--pure-white)" strokeOpacity=".48" strokeWidth="5" strokeLinecap="round" />
      <path d="M100 78v33" stroke="var(--pure-white)" strokeOpacity=".38" strokeWidth="2" strokeLinecap="round" />
      <rect
        x="28"
        y="108"
        width="64"
        height="64"
        rx="6"
        fill="var(--bg)"
        fillOpacity=".88"
      />
      <text
        x="60"
        y="134"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="12"
        fill="var(--ink)"
      >
        Quatréa
      </text>
      <line
        x1="44"
        x2="76"
        y1="142"
        y2="142"
        stroke="var(--ink)"
        strokeOpacity=".3"
      />
      <text
        x="60"
        y="158"
        textAnchor="middle"
        fontFamily="Jost, sans-serif"
        fontSize="8.5"
        fill="var(--ink)"
      >
        {name}
      </text>
    </svg>
  );
}
