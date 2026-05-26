import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ease } from "../../lib/motion";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const BG_75 = "rgba(5,5,5,0.75)";
const BG_96 = "rgba(5,5,5,0.96)";
const BG_25 = "rgba(5,5,5,0.25)";
const BG_90 = "rgba(5,5,5,0.9)";

export function FinalCTAClient() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-28px", "28px"]);

  return (
    <motion.section
      ref={ref}
      className="relative border-t border-bamboo/15 py-20"
    >
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto">
        <div className="relative overflow-hidden rounded min-h-120 max-[768px]:min-h-140">
          {/* Background image with parallax */}
          <motion.div
            aria-hidden="true"
            className="absolute bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/final_cta_background.png')",
              top: -32,
              left: 0,
              right: 0,
              bottom: -32,
              y: bgY,
            }}
          />

          {/* Desktop gradient: transparent left → dark right */}
          <div
            className="absolute inset-0 max-[768px]:hidden"
            style={{
              background: `linear-gradient(to right, transparent 20%, ${BG_75} 52%, ${BG_96} 100%)`,
            }}
            aria-hidden="true"
          />
          {/* Mobile gradient: transparent top → dark bottom */}
          <div
            className="absolute inset-0 hidden max-[768px]:block"
            style={{
              background: `linear-gradient(to bottom, ${BG_25} 0%, ${BG_90} 55%)`,
            }}
            aria-hidden="true"
          />

          {/* Content row */}
          <div className="relative z-10 flex items-center min-h-120 max-[768px]:min-h-140">
            {/* Spacer — expõe a imagem na esquerda */}
            <div className="flex-1 max-[768px]:hidden" />

            {/* Coluna de conteúdo */}
            <div className="w-[48%] flex flex-col gap-6 px-12 py-16 max-[768px]:w-full max-[768px]:px-6 max-[768px]:py-10">
              <motion.p
                className="text-blue-light font-display text-sm uppercase tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease }}
              >
                Disponível na Steam
              </motion.p>

              <motion.h2
                className="font-display text-4xl xl:text-5xl text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease }}
              >
                Pronto para Entrar na Tempestade de Bambu?
              </motion.h2>

              <motion.p
                className="text-muted text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.15, ease }}
              >
                Runs rápidas, cortes afiados e caos crescente — cada rodada é
                diferente. Domine o fluxo de combate e veja até onde você chega.
              </motion.p>

              <motion.div
                className="pt-2 border-t border-bamboo/15"
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.3, ease }}
              >
                <SteamButtonAnimated
                  label="JOGAR AGORA"
                  variant="primary"
                  size="lg"
                  event="steam_cta_final_click"
                  className="w-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
