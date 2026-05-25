import { motion } from "framer-motion";
import { PixelParticles } from "./PixelParticles";
import { SteamButtonAnimated } from "./SteamButtonAnimated";
import { ease } from "../../lib/motion";

const copyVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export function HeroCopy() {
  return (
    <motion.div
      className="w-full"
      variants={copyVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={itemVariants}
        className="mb-3.5 text-blue-light font-display text-xl uppercase"
      >
        Disponível na Steam
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="font-display text-[clamp(54px,7vw,96px)] max-[640px]:text-[clamp(46px,18vw,68px)] leading-[0.86] max-w-205 [text-shadow:5px_5px_0_rgba(0,0,0,0.74)]"
      >
        Slice Through <em className="text-scarlet italic">Chaos.</em> Become the{" "}
        <em className="text-scarlet italic">Ronin.</em>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="max-w-2xl text-muted text-lg leading-relaxed"
      >
        Byrd Ronin é um action roguelite onde cada corte, upgrade e onda de
        inimigos empurra sua run mais fundo no caos de bambu.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-4 mt-8 mb-4.5"
      >
        <SteamButtonAnimated
          label="JOGAR AGORA"
          variant="primary"
          event="steam_cta_hero_click"
          className="max-[640px]:w-full"
        />
        <motion.a
          className="inline-flex min-h-12 items-center justify-center gap-2.5 px-5 py-3 border-2 border-white/30 rounded-md text-white bg-white/5 font-display text-lg font-bold leading-none uppercase transition-[transform,box-shadow,background] duration-150 hover:-translate-y-0.5 max-[640px]:w-full max-[640px]:justify-center"
          href="#trailer"
          data-event="trailer_play_click"
          whileHover={{ scale: 1.03, borderColor: "rgba(73,194,242,0.7)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          Assistir Trailer
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export function HeroCharacter() {
  return (
    <motion.div
      className="relative min-h-130 max-[980px]:min-h-90 max-[640px]:min-h-65"
      aria-hidden="true"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease }}
    >
      <motion.img
        src="/images/hero_character.png"
        alt=""
        width="1536"
        height="864"
        className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-[0_36px_48px_rgba(0,0,0,0.5)] max-[640px]:opacity-35"
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function HeroParticles() {
  return <PixelParticles colors={["#49c2f2", "#bfb52c", "#f8fafc"]} />;
}
