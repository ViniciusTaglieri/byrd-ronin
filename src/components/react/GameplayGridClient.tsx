import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS, type GameplayClip } from "../../consts";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEO_RATIO = "585 / 329";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease },
  },
};

function GameplayCard({ src, title, context }: GameplayClip) {
  return (
    <motion.figure
      className="gameplay-card"
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(107,143,94,0.55)",
        boxShadow:
          "4px 4px 0 rgba(107,143,94,0.45), 0 24px 48px rgba(0,0,0,0.55)",
        transition: { duration: 0.22 },
      }}
      style={{ margin: 0 }}
    >
      <div
        className="gameplay-thumb"
        style={{
          aspectRatio: VIDEO_RATIO,
          position: "relative",
          overflow: "hidden",
          background: "var(--panel)",
        }}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            background: "var(--black)",
            filter: "saturate(1.1) brightness(0.9)",
          }}
        />
        <div className="gameplay-thumb-overlay" aria-hidden="true" />
      </div>

      <figcaption className="gameplay-card-caption">
        <span className="gameplay-caption-title">{title}</span>
        <span className="gameplay-caption-context">{context}</span>
      </figcaption>
    </motion.figure>
  );
}

export function GameplayGridClient() {
  return (
    <motion.div
      className="gameplay-grid gameplay-grid--2col"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {GAMEPLAY_CLIPS.map((clip) => (
        <GameplayCard key={clip.src} {...clip} />
      ))}
    </motion.div>
  );
}
