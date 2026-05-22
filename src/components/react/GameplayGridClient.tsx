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
      className="relative overflow-hidden m-0 border border-bamboo/25 rounded-xl bg-ink"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      style={{ cursor: "default" }}
    >
      {/* Vídeo */}
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
            background: "var(--color-black, #050505)",
            filter: "saturate(1.1) brightness(0.9)",
          }}
        />
        {/* Gradiente inferior permanente (mais suave) */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/50 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Caption slide-up */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-4 py-3.5 bg-ink/95"
        variants={{
          rest: { y: "100%" },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.25, ease }}
      >
        <span className="text-bamboo font-display text-lg leading-snug">
          {title}
        </span>
        <span className="text-muted text-sm leading-normal">{context}</span>
      </motion.div>
    </motion.figure>
  );
}

export function GameplayGridClient() {
  return (
    <motion.div
      className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-6"
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
