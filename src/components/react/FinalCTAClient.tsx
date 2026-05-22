import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PixelParticles } from "./PixelParticles";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const ease = [0.22, 1, 0.36, 1] as const;

interface Burst {
  id: number;
  x: number;
  y: number;
  angle: number;
  color: string;
}

function generateBurst(count = 10): Burst[] {
  const colors = ["#bfb52c", "#49c2f2", "#f8fafc", "#f21313"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50,
    y: 50,
    angle: (360 / count) * i,
    color: colors[i % colors.length],
  }));
}

export function FinalCTAClient() {
  const ref = useRef<HTMLElement>(null);
  const [burst, setBurst] = useState<Burst[]>([]);
  const [burstKey, setBurstKey] = useState(0);

  // Parallax no fundo
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);

  function handleButtonHover() {
    setBurst(generateBurst(12));
    setBurstKey((k) => k + 1);
  }

  return (
    <motion.section
      ref={ref}
      className="final-cta"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Fundo parallax */}
      <motion.div
        className="final-bg"
        style={{ y: bgY }}
        aria-hidden="true"
      />

      {/* Partículas de pixel */}
      <PixelParticles
        count={30}
        colors={["#bfb52c", "#f8fafc", "#49c2f2"]}
      />

      {/* Conteúdo */}
      <div className="container final-content" style={{ position: "relative", zIndex: 2 }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
        >
          Pronto para Entrar na Tempestade de Bambu?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.15, ease }}
        >
          Adicione Byrd Ronin à sua lista de desejos na Steam e esteja pronto
          para runs rápidas, cortes afiados e caos crescente.
        </motion.p>

        {/* Botão com particle burst */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.3, ease }}
          style={{ position: "relative", display: "inline-block" }}
          onHoverStart={handleButtonHover}
        >
          <SteamButtonAnimated
            label="WISHLIST NA STEAM"
            variant="primary"
            event="steam_cta_final_click"
          />

          {/* Particle burst */}
          {burst.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const dist = 60 + Math.random() * 40;
            return (
              <motion.div
                key={`${burstKey}-${p.id}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 5,
                  height: 5,
                  backgroundColor: p.color,
                  borderRadius: 0,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(rad) * dist,
                  y: Math.sin(rad) * dist,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
