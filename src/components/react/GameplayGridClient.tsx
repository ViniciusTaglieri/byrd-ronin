import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS, type GameplayClip } from "../../consts";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEO_RATIO = "585 / 329";

const clipVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease, delay: 0.1 },
  },
};

const textVariantsRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease, delay: 0.1 },
  },
};

interface ClipRowProps {
  clip: GameplayClip;
  index: number;
}

function ClipRow({ clip, index }: ClipRowProps) {
  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  const videoCol = (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      variants={clipVariants}
      style={{ aspectRatio: VIDEO_RATIO }}
    >
      {/* HUD badge overlay */}
      <div className="absolute top-3 left-3 z-10 font-display text-[9px] tracking-[0.3em] uppercase bg-black/60 text-bamboo px-2.5 py-1 rounded backdrop-blur-sm">
        {number} — {clip.eyebrow}
      </div>

      <motion.video
        src={clip.src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover block"
        style={{
          background: "var(--color-black, #050505)",
          filter: "saturate(1.1) brightness(0.9)",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4, ease }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );

  const textCol = (
    <motion.div
      className="relative flex flex-col gap-4"
      variants={isEven ? textVariants : textVariantsRight}
    >
      {/* Eyebrow */}
      <p className="relative font-display text-xs uppercase tracking-[0.28em] text-bamboo/70">
        {clip.eyebrow}
      </p>

      {/* Title */}
      <h3 className="relative font-display text-[clamp(1.6rem,3vw,2.4rem)] text-white leading-tight">
        {clip.title}
      </h3>

      {/* Description */}
      <div className="relative flex flex-col gap-3">
        {clip.description.split("\n\n").map((para, i) => (
          <p key={i} className="text-muted text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className={`relative grid max-[768px]:grid-cols-1 gap-12 items-center ${isEven ? "grid-cols-[5fr_7fr]" : "grid-cols-[7fr_5fr]"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Ghost number — posicionado acima da coluna de vídeo */}
      <span
        className="absolute font-display leading-none select-none pointer-events-none max-[768px]:hidden"
        style={{
          fontSize: "clamp(7rem, 18vw, 14rem)",
          top: "-0.35em",
          ...(isEven
            ? { right: 0, textAlign: "right" }
            : { left: 0 }),
          color: "transparent",
          WebkitTextStroke: "2px rgba(107,143,94,0.38)",
          letterSpacing: "-0.04em",
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {isEven ? (
        <>
          <div>{textCol}</div>
          <div>{videoCol}</div>
        </>
      ) : (
        <>
          <div>{videoCol}</div>
          <div>{textCol}</div>
        </>
      )}
    </motion.div>
  );
}

export function GameplayGridClient() {
  return (
    <div className="flex flex-col gap-0">
      {GAMEPLAY_CLIPS.map((clip, index) => (
        <div key={clip.src}>
          <ClipRow clip={clip} index={index} />
          {index < GAMEPLAY_CLIPS.length - 1 && (
            <hr className="border-bamboo/20 my-16" />
          )}
        </div>
      ))}
    </div>
  );
}
