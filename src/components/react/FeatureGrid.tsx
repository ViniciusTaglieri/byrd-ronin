import { motion } from "framer-motion";
import { UpgradeIcon, EnemyIcon, ChaosIcon } from "./FeatureIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    Icon: UpgradeIcon,
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
    iconColor: "text-gold",
  },
  {
    Icon: EnemyIcon,
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
    iconColor: "text-blue-light",
  },
  {
    Icon: ChaosIcon,
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
    iconColor: "text-red",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

function FeatureCard({
  Icon,
  title,
  text,
  iconColor,
}: (typeof features)[number]) {
  return (
    <motion.article
      className="bg-panel border border-bamboo/20 rounded-2xl p-8 flex flex-col gap-5"
      variants={cardVariants}
      whileHover={{
        y: -4,
        borderColor: "rgba(107,143,94,0.5)",
        boxShadow: "4px 4px 0 rgba(107,143,94,0.4), 0 24px 48px rgba(0,0,0,0.4)",
        transition: { duration: 0.2 },
      }}
    >
      <motion.span
        className={`flex items-center justify-center w-16 h-16 ${iconColor}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Icon />
      </motion.span>
      <h3 className="font-display text-2xl text-white">{title}</h3>
      <p className="text-muted text-base leading-relaxed">{text}</p>
    </motion.article>
  );
}

export function FeatureGrid() {
  return (
    <motion.div
      className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-6"
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
