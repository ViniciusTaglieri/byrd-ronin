import { motion } from "framer-motion";

function ShurikenSVG() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
    >
      <path d="M26 3 L31 26 L26 49 L21 26 Z" fill="currentColor" />
      <path d="M3 26 L26 21 L49 26 L26 31 Z" fill="currentColor" />
      <circle cx="26" cy="26" r="4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function KatanaSVG() {
  return (
    <svg
      width="14"
      height="200"
      viewBox="0 0 14 200"
      fill="none"
      aria-hidden="true"
    >
      <path d="M7 0 L10 165 L7 182 L4 165 Z" fill="currentColor" />
      <rect x="0" y="165" width="14" height="5" rx="1" fill="currentColor" />
      <rect x="5" y="170" width="4" height="30" rx="1" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function WideScreenDecor() {
  return (
    <>
      <motion.div
        className="fixed left-5 top-[38%] hidden min-[1400px]:block text-white pointer-events-none select-none z-0"
        style={{ opacity: 0.055 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <ShurikenSVG />
      </motion.div>

      <div
        className="fixed right-6 top-[28%] hidden min-[1400px]:block text-white pointer-events-none select-none z-0"
        style={{ opacity: 0.055, transform: "rotate(-18deg)" }}
      >
        <KatanaSVG />
      </div>
    </>
  );
}
