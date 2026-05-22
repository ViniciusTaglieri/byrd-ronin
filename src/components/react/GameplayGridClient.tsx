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
      className="overflow-hidden m-0 border border-bamboo/25 rounded-lg bg-[rgba(13,26,15,0.5)]"
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(107,143,94,0.55)",
        boxShadow:
          "4px 4px 0 rgba(107,143,94,0.45), 0 24px 48px rgba(0,0,0,0.55)",
        transition: { duration: 0.22 },
      }}
    >
      <div
        className="relative overflow-hidden bg-panel"
        style={{ aspectRatio: VIDEO_RATIO }}
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
        <div
          className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/70 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <figcaption className="flex flex-col gap-1 px-4 py-[14px]">
        <span className="text-white font-display text-[18px] leading-[1.3]">
          {title}
        </span>
        <span className="text-muted text-[14px] leading-[1.5]">{context}</span>
      </figcaption>
    </motion.figure>
  );
}

export function GameplayGridClient() {
  return (
    <motion.div
      className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-7"
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
