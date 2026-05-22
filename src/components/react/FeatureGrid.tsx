import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { UpgradeIcon, EnemyIcon, ChaosIcon } from "./FeatureIcons";
import { SwordSlash } from "./SwordSlash";
import { BambooDecor } from "./BambooDecor";

const ease = [0.22, 1, 0.36, 1] as const;

const features: Array<{ Icon: () => React.ReactElement; title: string; text: string }> = [
  {
    Icon: UpgradeIcon,
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
  },
  {
    Icon: EnemyIcon,
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
  },
  {
    Icon: ChaosIcon,
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

function FeatureCard({
  Icon,
  title,
  text,
}: {
  Icon: () => React.ReactElement;
  title: string;
  text: string;
}) {
  return (
    <motion.article
      className="feature-card feature-card--alt"
      variants={cardVariants}
      whileHover={{
        y: -4,
        borderColor: "rgba(107,143,94,0.55)",
        boxShadow: "4px 4px 0 rgba(107,143,94,0.45), 0 24px 48px rgba(0,0,0,0.4)",
        transition: { duration: 0.2 },
      }}
    >
      <motion.span
        className="feature-icon"
        whileHover={{
          rotate: [-5, 5, -3, 3, 0],
          scale: 1.1,
          transition: { duration: 0.4 },
        }}
      >
        <Icon />
      </motion.span>
      <div className="feature-card-body">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </motion.article>
  );
}

export function FeatureGrid() {
  const [slashActive, setSlashActive] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;
    const section = document.getElementById("features");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setSlashActive(true);
          setHasTriggered(true);
          setTimeout(() => setSlashActive(false), 700);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <>
      <SwordSlash trigger={slashActive} variant="horizontal" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px", opacity: 0.15 }}>
        <BambooDecor side="left" opacity={1} style={{ transform: "rotate(90deg)", height: "56px" }} />
      </div>

      <motion.div
        className="feature-grid feature-grid--alt"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </motion.div>
    </>
  );
}
