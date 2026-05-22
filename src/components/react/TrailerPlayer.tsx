import { motion, AnimatePresence } from "framer-motion";
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
        className="relative w-full overflow-hidden border border-bamboo/[0.35] rounded-lg bg-black shadow-[4px_4px_0_rgba(191,181,44,0.5),0_32px_80px_rgba(0,0,0,0.48)] cursor-pointer"
        whileHover={{
          boxShadow:
            "10px 10px 0 rgba(191,181,44,0.9), 0 0 32px rgba(73,194,242,0.35), 0 32px 80px rgba(0,0,0,0.5)",
        }}
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
                poster="/page_bg_raw_gpt.png"
                muted
                loop
                playsInline
                autoPlay
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(1.2) brightness(0.65)",
                }}
              />

              {youtubeId && (
                <motion.button
                  className="play-button"
                  aria-label="Assistir trailer completo no YouTube"
                  onClick={() => setPlaying(true)}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    backgroundColor: "#bfb52c",
                  }}
                  whileTap={{ scale: 0.9 }}
                />
              )}

              <span className="trailer-caption">
                {youtubeId
                  ? "Clique para assistir o trailer completo"
                  : "Trailer de gameplay — Byrd Ronin"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
