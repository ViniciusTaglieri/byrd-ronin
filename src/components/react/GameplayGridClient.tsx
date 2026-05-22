import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS } from "../../consts";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
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
  const isVideo = src.endsWith(".webm") || src.endsWith(".mp4");

  return (
    <motion.figure
      className="gameplay-card"
      variants={cardVariants}
      whileHover={{
        scale: 1.04,
        borderColor: "rgba(73,194,242,0.7)",
        boxShadow:
          "8px 8px 0 rgba(73,194,242,0.5), 0 24px 48px rgba(0,0,0,0.5)",
        transition: { duration: 0.2 },
      }}
      style={{ margin: 0 }}
    >
      <div className="gameplay-thumb">
        {isVideo ? (
          <motion.video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "saturate(1.15) brightness(0.76)",
            }}
            whileHover={{ filter: "saturate(1.4) brightness(0.9)" } as any}
            transition={{ duration: 0.2 }}
          />
        ) : (
          <motion.img
            src={src}
            alt=""
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "saturate(1.15) brightness(0.76)",
            }}
            whileHover={{ scale: 1.08, filter: "saturate(1.4) brightness(0.9)" } as any}
            transition={{ duration: 0.2 }}
          />
        )}
        <span className="gameplay-label">{label}</span>
      </div>
      <figcaption>{caption}</figcaption>
    </motion.figure>
  );
}

export function GameplayGridClient() {
  return (
    <motion.div
      className="gameplay-grid"
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
