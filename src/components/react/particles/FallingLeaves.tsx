import { useEffect, useRef, useState } from "react";

interface Leaf {
  id: number;
  shape: 0 | 1 | 2;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Props {
  mode?: "ambient" | "section";
  count?: number;
}

const LEAF_PATHS = [
  "M0,-9 C5,-7 7,-1 5,6 C2,9 -2,9 -5,6 C-7,-1 -5,-7 0,-9Z",
  "M0,-10 C6,-5 8,1 4,8 C0,6 -4,8 -8,1 C-6,-5 0,-10 0,-10Z",
  "M0,-8 C3,-8 7,-3 7,2 C7,6 3,9 0,8 C-3,9 -7,6 -7,2 C-7,-3 -3,-8 0,-8Z",
];

function makeLeaves(count: number): Leaf[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: (i % 3) as 0 | 1 | 2,
    size: 12 + Math.random() * 10,
    left: Math.random() * 98,
    duration: 9 + Math.random() * 10,
    delay: Math.random() * 14,
    opacity: 0.55 + Math.random() * 0.3,
  }));
}

export function FallingLeaves({ mode = "ambient", count = 15 }: Props) {
  const [active, setActive] = useState(false);
  const [leaves] = useState(() => makeLeaves(count));
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    if (mode === "ambient") {
      setActive(true);
      return;
    }

    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(parent);
    return () => obs.disconnect();
  }, [mode]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2,
        maskImage: "linear-gradient(to bottom, black 55%, transparent 90%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 90%)",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes leaf-fall-a {
          0%   { transform: translateY(-20px) rotate(0deg)    translateX(0px); }
          25%  { transform: translateY(25vh)  rotate(45deg)   translateX(28px); }
          50%  { transform: translateY(52vh)  rotate(90deg)   translateX(-18px); }
          75%  { transform: translateY(76vh)  rotate(135deg)  translateX(22px); }
          100% { transform: translateY(108vh) rotate(180deg)  translateX(-8px); }
        }
        @keyframes leaf-fall-b {
          0%   { transform: translateY(-20px) rotate(0deg)    translateX(0px); }
          33%  { transform: translateY(34vh)  rotate(-55deg)  translateX(-36px); }
          66%  { transform: translateY(66vh)  rotate(-115deg) translateX(32px); }
          100% { transform: translateY(108vh) rotate(-175deg) translateX(-12px); }
        }
        @keyframes leaf-fall-c {
          0%   { transform: translateY(-20px) rotate(20deg)   translateX(0px); }
          20%  { transform: translateY(22vh)  rotate(52deg)   translateX(18px); }
          40%  { transform: translateY(44vh)  rotate(84deg)   translateX(-28px); }
          60%  { transform: translateY(63vh)  rotate(128deg)  translateX(14px); }
          80%  { transform: translateY(82vh)  rotate(162deg)  translateX(-22px); }
          100% { transform: translateY(108vh) rotate(198deg)  translateX(8px); }
        }
      `}</style>

      {active &&
        leaves.map((leaf) => {
          const animName = (["leaf-fall-a", "leaf-fall-b", "leaf-fall-c"] as const)[leaf.shape];
          return (
            <svg
              key={leaf.id}
              width={leaf.size}
              height={leaf.size}
              viewBox="-10 -10 20 20"
              style={{
                position: "absolute",
                top: "-20px",
                left: `${leaf.left}%`,
                opacity: leaf.opacity,
                color: "#c4e8a8",
                filter: "drop-shadow(0 0 4px rgba(180, 230, 140, 0.45))",
                animation: `${animName} ${leaf.duration}s ${leaf.delay}s infinite linear`,
                willChange: "transform",
              }}
            >
              <path d={LEAF_PATHS[leaf.shape]} fill="currentColor" />
            </svg>
          );
        })}
    </div>
  );
}
