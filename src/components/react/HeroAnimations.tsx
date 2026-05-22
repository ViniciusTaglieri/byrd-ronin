import { motion } from "framer-motion";
import { PixelParticles } from "./PixelParticles";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const ease = [0.22, 1, 0.36, 1] as const;

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
      className="max-w-[650px] min-[981px]:max-h-[45vh] min-[981px]:overflow-visible"
      variants={copyVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={itemVariants}
        className="mb-3.5 text-blue-light font-display text-xl uppercase"
      >
        Available on Steam
      </motion.p>

      <motion.h1 variants={itemVariants}>
        Slice Through{" "}
        <em className="text-gold italic">Chaos.</em>
        {" "}Become the{" "}
        <em className="text-gold italic">Ronin.</em>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="max-w-[610px] text-muted text-[19px] leading-[1.7]"
      >
        Byrd Ronin é um action roguelite onde cada corte, upgrade e onda de
        inimigos empurra sua run mais fundo no caos de bambu.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-4 mt-8 mb-[18px]"
      >
        <SteamButtonAnimated
          label="JOGAR AGORA"
          variant="primary"
          event="steam_cta_hero_click"
          className="max-[640px]:w-full"
        />
        <motion.a
          className="inline-flex min-h-[48px] items-center justify-center gap-[10px] px-5 py-[13px] border-2 border-white/40 rounded-md text-white bg-black/30 font-display text-[18px] font-bold leading-none uppercase transition-[transform,box-shadow,background] duration-[160ms] hover:-translate-y-0.5 max-[640px]:w-full max-[640px]:justify-center"
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
      className="relative min-h-[470px] max-[980px]:min-h-[340px] max-[640px]:min-h-[270px]"
      aria-hidden="true"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease }}
    >
      <motion.img
        src="/personagem.png"
        alt=""
        width="1536"
        height="864"
        className="absolute right-[-170px] bottom-[-70px] w-[min(850px,68vw)] max-w-none drop-shadow-[0_36px_48px_rgba(0,0,0,0.5)] max-[980px]:right-[-90px] max-[980px]:bottom-[-80px] max-[980px]:w-[min(700px,105vw)] max-[640px]:opacity-35 max-[640px]:top-0 max-[640px]:right-[-84px] max-[640px]:bottom-auto max-[640px]:w-[430px]"
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
