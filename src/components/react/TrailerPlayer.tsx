import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function TrailerPlayer() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.15, ease }}
    >
      <motion.div
        className="relative w-full overflow-hidden border border-bamboo/35 rounded bg-black shadow-[4px_4px_0_rgba(191,181,44,0.25),0_32px_80px_rgba(0,0,0,0.48)]"
        whileHover={{ scale: 1.008 }}
        transition={{ duration: 0.25 }}
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
        />
      </motion.div>
    </motion.div>
  );
}
