import type { CSSProperties } from "react";

interface Props {
  side: "left" | "right";
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

export function BambooDecor({ side, opacity = 0.20, className, style }: Props) {
  const isRight = side === "right";

  return (
    <svg
      width="56"
      height="220"
      viewBox="0 0 56 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, color: "var(--bamboo, #6b8f5e)", ...style }}
      aria-hidden="true"
    >
      {/* Main stalk */}
      <rect x="24" y="0" width="8" height="200" rx="3" fill="currentColor" />

      {/* Node bands */}
      <rect x="20" y="44"  width="16" height="5" rx="2" fill="currentColor" />
      <rect x="20" y="88"  width="16" height="5" rx="2" fill="currentColor" />
      <rect x="20" y="132" width="16" height="5" rx="2" fill="currentColor" />
      <rect x="20" y="176" width="16" height="5" rx="2" fill="currentColor" />

      {/* Second thinner stalk */}
      <rect x={isRight ? 10 : 40} y="30" width="5" height="160" rx="2" fill="currentColor" opacity="0.6" />
      <rect x={isRight ? 7  : 37} y="74"  width="11" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x={isRight ? 7  : 37} y="118" width="11" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x={isRight ? 7  : 37} y="162" width="11" height="4" rx="1" fill="currentColor" opacity="0.6" />

      {/* Leaves */}
      {!isRight ? (
        <>
          <ellipse cx="14" cy="42" rx="13" ry="4" fill="currentColor"
            transform="rotate(-35 14 42)" opacity="0.85" />
          <ellipse cx="10" cy="86" rx="15" ry="4" fill="currentColor"
            transform="rotate(-45 10 86)" opacity="0.75" />
          <ellipse cx="16" cy="130" rx="12" ry="4" fill="currentColor"
            transform="rotate(-28 16 130)" opacity="0.80" />
        </>
      ) : (
        <>
          <ellipse cx="42" cy="42" rx="13" ry="4" fill="currentColor"
            transform="rotate(35 42 42)" opacity="0.85" />
          <ellipse cx="46" cy="86" rx="15" ry="4" fill="currentColor"
            transform="rotate(45 46 86)" opacity="0.75" />
          <ellipse cx="40" cy="130" rx="12" ry="4" fill="currentColor"
            transform="rotate(28 40 130)" opacity="0.80" />
        </>
      )}
    </svg>
  );
}
