import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type SlashVariant = "full" | "medium" | "horizontal";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  angle: number;
}

interface Props {
  trigger: boolean;
  variant?: SlashVariant;
  onComplete?: () => void;
}

const slashPaths: Record<SlashVariant, string> = {
  full: "M -50 -50 L 110 110",      // diagonal full screen
  medium: "M 10 10 L 90 90",        // diagonal médio
  horizontal: "M -5 50 L 105 50",   // horizontal
};

function generateSparkles(count = 5): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 75 + (Math.random() - 0.5) * 20,
    y: 75 + (Math.random() - 0.5) * 20,
    angle: (360 / count) * i + Math.random() * 30,
  }));
}

export function SwordSlash({ trigger, variant = "full", onComplete }: Props) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [showSparkles, setShowSparkles] = useState(false);

  // Não renderiza em mobile (< 640px) — performance
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // Não renderiza se prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (!trigger) return;
    // Sparkles aparecem após o slash (300ms)
    const t = setTimeout(() => {
      setSparkles(generateSparkles(5));
      setShowSparkles(true);
      setTimeout(() => {
        setShowSparkles(false);
        onComplete?.();
      }, 500);
    }, 280);
    return () => clearTimeout(t);
  }, [trigger, onComplete]);

  if (isMobile || reducedMotion) return null;

  const path = slashPaths[variant];

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.35, duration: 0.2 }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {/* Glow layer */}
            <motion.path
              d={path}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            />
            {/* Main slash */}
            <motion.path
              d={path}
              stroke="white"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>

          {/* Sparkles em gold */}
          {showSparkles &&
            sparkles.map((s) => {
              const rad = (s.angle * Math.PI) / 180;
              const dx = Math.cos(rad) * 8;
              const dy = Math.sin(rad) * 8;
              return (
                <motion.div
                  key={s.id}
                  style={{
                    position: "absolute",
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: 4,
                    height: 4,
                    backgroundColor: "#bfb52c",
                    borderRadius: 0,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: `${dx}vw`,
                    y: `${dy}vh`,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              );
            })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
