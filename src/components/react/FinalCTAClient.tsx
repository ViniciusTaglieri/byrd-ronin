import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PixelParticles } from "./PixelParticles";
import { SteamButtonAnimated } from "./SteamButtonAnimated";
import { FallingLeaves } from "./FallingLeaves";

const ease = [0.22, 1, 0.36, 1] as const;

interface Burst {
  id: number;
  angle: number;
  color: string;
}

function generateBurst(count = 10): Burst[] {
  const colors = ["#bfb52c", "#6b8f5e", "#f8fafc", "#b4d2b4"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i,
    color: colors[i % colors.length],
  }));
}

export function FinalCTAClient() {
  const ref = useRef<HTMLElement>(null);
  const [burst, setBurst] = useState<Burst[]>([]);
  const [burstKey, setBurstKey] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-24px", "24px"]);

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
      <PixelParticles count={20} colors={["#bfb52c", "#6b8f5e", "#f8fafc"]} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="final-cta-container">
          {/* Left: background image with parallax */}
          <motion.div
            className="final-cta-image"
            style={{ y: bgY }}
            aria-hidden="true"
          />

          {/* Right: content */}
          <div className="final-cta-content" style={{ position: "relative", overflow: "hidden" }}>
            <FallingLeaves mode="section" count={10} />

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
              Runs rápidas, cortes afiados e caos crescente — cada rodada é
              diferente. Domine o fluxo de combate e veja até onde você chega.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.3, ease }}
              style={{ position: "relative", display: "inline-block" }}
              onHoverStart={handleButtonHover}
            >
              <SteamButtonAnimated
                label="JOGAR AGORA"
                variant="primary"
                event="steam_cta_final_click"
              />

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
        </div>
      </div>
    </motion.section>
  );
}
