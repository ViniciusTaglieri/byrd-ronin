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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

export function FeatureGrid() {
  return (
    <motion.div
      className="flex flex-col"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {features.map((f, i) => (
        <motion.article
          key={f.title}
          className={[
            "grid grid-cols-[40px_1fr_2fr] max-[640px]:grid-cols-[40px_1fr] gap-x-6 gap-y-2 items-center",
            "py-8 px-2 -mx-2 rounded-sm",
            "cursor-default transition-colors duration-200 hover:bg-bamboo/[0.04]",
            i < features.length - 1 ? "border-b border-bamboo/15" : "",
          ].join(" ")}
          variants={rowVariants}
        >
          <img
            src={f.icon}
            alt=""
            width="40"
            height="40"
            aria-hidden="true"
            className="w-10 h-10 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
          <h3 className="font-display text-xl text-white">{f.title}</h3>
          <p className="text-muted text-base leading-relaxed max-[640px]:col-span-2 max-[640px]:col-start-2">
            {f.text}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}
