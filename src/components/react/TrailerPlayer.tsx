import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Props {
  youtubeId?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function TrailerPlayer({ youtubeId }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.15, ease }}
    >
      <motion.div
        className="relative w-full overflow-hidden border border-bamboo/35 rounded bg-black shadow-[4px_4px_0_rgba(191,181,44,0.25),0_32px_80px_rgba(0,0,0,0.48)] cursor-pointer"
        whileHover={{ scale: 1.008 }}
        transition={{ duration: 0.25 }}
      >
        <AnimatePresence mode="wait">
          {playing && youtubeId ? (
            <motion.iframe
              key="youtube"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title="Byrd Ronin Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                aspectRatio: "16/9",
                border: "none",
                display: "block",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="thumb"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => youtubeId && setPlaying(true)}
            >
              <video
                src="/trailer.mp4"
                poster="/hero-bg.png"
                muted
                loop
                playsInline
                autoPlay
                controls
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(1.2) brightness(0.65)",
                }}
                onClick={(e) => e.stopPropagation()}
              />

              {youtubeId && (
                <motion.button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 flex items-center justify-center border-4 border-white rounded-full bg-red shadow-[0_12px_0_#870707] cursor-pointer"
                  aria-label="Assistir trailer completo no YouTube"
                  onClick={() => setPlaying(true)}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2, backgroundColor: "#bfb52c" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    width="26"
                    height="36"
                    viewBox="0 0 26 36"
                    fill="white"
                    aria-hidden="true"
                    style={{ marginLeft: "4px" }}
                  >
                    <polygon points="0,0 26,18 0,36" />
                  </svg>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
