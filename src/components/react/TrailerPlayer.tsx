import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ease } from "../../lib/motion";

const YOUTUBE_ID = "Dl2vowH1bf4";
const EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export function TrailerPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.15, ease }}
    >
      <motion.div
        className="relative w-full overflow-hidden border border-bamboo/35 rounded bg-black shadow-video"
        whileHover={!playing ? { scale: 1.008 } : {}}
        transition={{ duration: 0.25 }}
        style={{ aspectRatio: "16/9" }}
      >
        {playing ? (
          <iframe
            src={EMBED_URL}
            title="Byrd Ronin — Trailer"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}images/og_image.png`}
            alt="Byrd Ronin trailer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "saturate(1.1) brightness(0.92)",
            }}
          />
        )}

        <AnimatePresence>
          {!playing && (
            <motion.button
              className="absolute inset-0 flex items-center justify-center w-full cursor-pointer"
              onClick={() => setPlaying(true)}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              aria-label="Reproduzir trailer"
            >
              <div className="absolute inset-0 bg-black/25" />

              <motion.div
                className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.12, backgroundColor: "rgba(255,255,255,0.22)" }}
                transition={{ duration: 0.18 }}
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="white"
                  aria-hidden="true"
                  style={{ marginLeft: 3 }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
