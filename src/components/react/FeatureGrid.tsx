import { motion } from "framer-motion";
import { ease } from "../../lib/motion";

const features = [
  {
    icon: `${import.meta.env.BASE_URL}images/features_upgrades.png`,
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
  },
  {
    icon: `${import.meta.env.BASE_URL}images/features_inimigos.png`,
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
  },
  {
    icon: `${import.meta.env.BASE_URL}images/features_caos.png`,
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  hovered: {
    y: -4,
    borderColor: "rgba(107,143,94,0.55)",
    backgroundColor: "rgba(107,143,94,0.06)",
    boxShadow: "6px 6px 0 rgba(107,143,94,0.50)",
    transition: { duration: 0.15 },
  },
};

function CornerDecor() {
  return (
    <>
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
    </>
  );
}

function FeatureCard({ icon, title, text }: (typeof features)[number]) {
  return (
    <motion.article
      className="group relative border border-bamboo/15 p-9 flex flex-col items-center gap-5 cursor-default overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(107,143,94,0.04) 100%)",
      }}
      variants={cardVariants}
      whileHover="hovered"
    >
      <CornerDecor />

      <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-black/40 border border-bamboo/15">
        <img
          src={icon}
          alt=""
          width="64"
          height="64"
          aria-hidden="true"
          className="w-16 h-16 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <h3 className="relative z-10 font-display text-3xl text-white text-center leading-tight">
        {title}
      </h3>

      <div className="relative z-10 w-14 h-px bg-bamboo/50" />

      <p className="relative z-10 text-muted text-sm leading-relaxed text-center">
        {text}
      </p>
    </motion.article>
  );
}

export function FeatureGrid() {
  return (
    <motion.div
      className="grid grid-cols-3 max-[768px]:grid-cols-1 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {features.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </motion.div>
  );
}
