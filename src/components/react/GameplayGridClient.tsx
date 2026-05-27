import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS, type GameplayClip } from "../../consts";
import { ease } from "../../lib/motion";

const VIDEO_RATIO = "585 / 329";

const clipVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

function makeTextVariants(dir: 1 | -1) {
  return {
    hidden: { opacity: 0, x: -24 * dir },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease, delay: 0.1 } },
  };
}
const textVariants = makeTextVariants(1);
const textVariantsRight = makeTextVariants(-1);

interface ClipRowProps {
  clip: GameplayClip;
  index: number;
}

function ClipRow({ clip, index }: ClipRowProps) {
  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  const videoCol = (
    <motion.div
      className="relative overflow-hidden rounded-xl phablet:order-last"
      variants={clipVariants}
      style={{
        aspectRatio: VIDEO_RATIO,
        boxShadow: "8px 8px 0 rgba(107,143,94,0.15)",
      }}
    >
      <div className="absolute top-3 left-3 z-10 font-display text-3xs tracking-ui-wide uppercase bg-black/60 text-bamboo px-2.5 py-1 rounded backdrop-blur-sm">
        {number} — {clip.eyebrow}
      </div>

      <motion.video
        src={clip.src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="w-full h-full object-cover block"
        style={{
          background: "var(--color-black, #050505)",
          filter: "saturate(1.1) brightness(0.9)",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4, ease }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );

  const textCol = (
    <motion.div
      className="relative flex flex-col gap-4 phablet:order-first"
      variants={isEven ? textVariants : textVariantsRight}
    >
      <p className="relative font-display text-xs uppercase tracking-widest text-bamboo/90">
        {clip.eyebrow}
      </p>

      <h3 className="relative font-display text-section-md text-white leading-tight">
        {clip.title}
      </h3>

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
      className={`relative grid phablet:grid-cols-1 gap-12 items-center ${
        isEven ? "grid-cols-gameplay-even" : "grid-cols-gameplay-odd"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {isEven ? (
        <>
          {textCol}
          {videoCol}
        </>
      ) : (
        <>
          {videoCol}
          {textCol}
        </>
      )}
    </motion.div>
  );
}

export function GameplayGridClient() {
  return (
    <div className="flex flex-col">
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
