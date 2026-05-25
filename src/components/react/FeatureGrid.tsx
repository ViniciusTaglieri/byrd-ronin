import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    icon: "/features_upgrades.png",
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
  },
  {
    icon: "/features_inimigos.png",
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
  },
  {
    icon: "/features_caos.png",
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
};

function CornerDecor() {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-bamboo/50 pointer-events-none" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-bamboo/50 pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-bamboo/50 pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-bamboo/50 pointer-events-none" />
    </>
  );
}

function FeatureCard({ icon, title, text }: (typeof features)[number]) {
  return (
    <motion.article
      className="relative bg-panel border border-bamboo/15 p-7 flex flex-col items-center gap-5 cursor-default"
      variants={cardVariants}
      whileHover={{
        y: -4,
        borderColor: "rgba(107,143,94,0.55)",
        boxShadow: "4px 4px 0 rgba(107,143,94,0.45)",
      }}
      transition={{ duration: 0.15 }}
    >
      <CornerDecor />

      {/* Icon slot */}
      <div className="flex items-center justify-center w-16 h-16 bg-black/40 border border-bamboo/15">
        <img
          src={icon}
          alt=""
          width="48"
          height="48"
          aria-hidden="true"
          className="w-12 h-12 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <h3 className="font-display text-2xl text-white text-center leading-tight">
        {title}
      </h3>

      <div className="w-10 h-px bg-bamboo/35" />

      <p className="text-muted text-sm leading-relaxed text-center">{text}</p>
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
