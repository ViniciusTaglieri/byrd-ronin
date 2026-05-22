import { motion } from "framer-motion";
import { PixelParticles } from "./PixelParticles";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const ease = [0.22, 1, 0.36, 1] as const;

// Variante de entrada staggerada para o copy
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

const logoVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease },
  },
};

export function HeroCopy() {
  return (
    <motion.div
      className="hero-copy"
      variants={copyVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.img
        variants={logoVariants}
        className="hero-logo"
        src="/logo.png"
        alt="Byrd Ronin"
        width="460"
        height="258"
      />

      {/* Kicker */}
      <motion.p variants={itemVariants} className="availability">
        Available on Steam
      </motion.p>

      {/* H1 */}
      <motion.h1 variants={itemVariants}>
        Slice Through Chaos.<br />Become the Ronin.
      </motion.h1>

      {/* Descrição */}
      <motion.p variants={itemVariants} className="hero-text">
        Byrd Ronin é um action roguelite onde cada corte, upgrade e onda de
        inimigos empurra sua run mais fundo no caos de bambu.
      </motion.p>

      {/* Botões */}
      <motion.div variants={itemVariants} className="hero-actions">
        <SteamButtonAnimated
          label="JOGAR AGORA"
          variant="primary"
          event="steam_cta_hero_click"
        />
        <motion.a
          className="ghost-button"
          href="#trailer"
          data-event="trailer_play_click"
          whileHover={{ scale: 1.03, borderColor: "rgba(73,194,242,0.7)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          Assistir Trailer
        </motion.a>
      </motion.div>

      {/* Proof */}
      <motion.p variants={itemVariants} className="hero-proof">
        Action roguelite bamboo slasher — combate preciso, runs rápidas,
        pressão crescente.
      </motion.p>
    </motion.div>
  );
}

export function HeroCharacter() {
  return (
    <motion.div
      className="hero-character"
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
  return (
    <PixelParticles
      colors={["#49c2f2", "#bfb52c", "#f8fafc"]}
    />
  );
}
