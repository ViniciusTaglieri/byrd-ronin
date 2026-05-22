import { motion } from "framer-motion";
import React from "react";
import { UpgradeIcon, EnemyIcon, ChaosIcon } from "./FeatureIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const features: Array<{
  Icon: () => React.ReactElement;
  title: string;
  text: string;
  iconColor: string;
}> = [
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
];

function BambooDivider() {
  return (
    <div className="flex items-center gap-4 my-8" aria-hidden="true">
      <div className="flex-1 border-t border-bamboo/20" />
      <div className="w-5 h-5 rounded-full bg-bamboo/20 border-2 border-bamboo/40 flex-none" />
      <div className="flex-1 border-t border-bamboo/20" />
    </div>
  );
}

function FeatureRow({
  Icon,
  title,
  text,
  iconColor,
  index,
}: (typeof features)[number] & { index: number }) {
  const isEven = index % 2 === 1;

  return (
    <motion.article
      className="bg-ink rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease }}
      whileHover={{
        y: -4,
        boxShadow: "4px 4px 0 rgba(107,143,94,0.5), 0 32px 60px rgba(0,0,0,0.35)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Bloco ícone */}
      <div
        className={`bg-bamboo/10 p-12 flex items-center justify-center flex-none lg:w-80 ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <motion.span
          className={`flex items-center justify-center w-24 h-24 ${iconColor}`}
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Icon />
        </motion.span>
      </div>

      {/* Bloco texto */}
      <div
        className={`p-10 flex flex-col justify-center gap-4 flex-1 ${isEven ? "lg:order-1" : "lg:order-2"}`}
      >
        <h3 className="font-display text-3xl text-white">{title}</h3>
        <p className="text-muted text-base leading-relaxed">{text}</p>
      </div>
    </motion.article>
  );
}

export function FeatureGrid() {
  return (
    <div className="flex flex-col">
      {features.map((feature, i) => (
        <React.Fragment key={feature.title}>
          <FeatureRow {...feature} index={i} />
          {i < features.length - 1 && <BambooDivider />}
        </React.Fragment>
      ))}
    </div>
  );
}
