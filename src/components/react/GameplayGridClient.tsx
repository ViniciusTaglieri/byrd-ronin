import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS } from "../../consts";

const ease = [0.22, 1, 0.36, 1] as const;

// Ratio nativo dos arquivos: 1170×658 = 585:329
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
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease },
  },
};

function GameplayCard({
  src,
  caption,
  label,
}: {
  src: string;
  caption: string;
  label: string;
}) {
  return (
    <motion.figure
      className="gameplay-card"
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(73,194,242,0.7)",
        boxShadow:
          "8px 8px 0 rgba(73,194,242,0.5), 0 24px 48px rgba(0,0,0,0.55)",
        transition: { duration: 0.22 },
      }}
      style={{ margin: 0 }}
    >
      <div
        className="gameplay-thumb"
        style={{
          /* Preserva o aspect ratio original do arquivo — sem corte */
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
            /* Ocupa 100% do container, preserva proporção, sem crop */
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            background: "var(--black)",
            filter: "saturate(1.1) brightness(0.9)",
          }}
        />

        {/* Badge de número */}
        <span className="gameplay-label">{label}</span>
      </div>

      <figcaption className="gameplay-card-caption">{caption}</figcaption>
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
        <GameplayCard key={clip.label} {...clip} />
      ))}
    </motion.div>
  );
}
