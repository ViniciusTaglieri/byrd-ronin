import { motion, useScroll } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(90deg, #49c2f2, #bfb52c, #f21313)",
        scaleX: scrollYProgress,
        transformOrigin: "left",
        zIndex: 100,
      }}
    />
  );
}
