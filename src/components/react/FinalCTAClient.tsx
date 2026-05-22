import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCTAClient() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-24px", "24px"]);

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden bg-sky py-16"
    >
      <div className="w-[min(1160px,calc(100%-40px))] mx-auto relative z-10">
        <div className="relative grid grid-cols-2 max-[768px]:grid-cols-1 rounded-2xl overflow-hidden shadow-2xl border border-bamboo/20">
          {/* Coluna esquerda — imagem com parallax */}
          <motion.div
            className="bg-cover bg-center min-h-80 max-[768px]:min-h-48"
            style={{
              backgroundImage: "url('/final_cta_background 1.png')",
              y: bgY,
            }}
            aria-hidden="true"
          />

          {/* Coluna direita — conteúdo */}
          <div className="relative overflow-hidden flex flex-col justify-center gap-6 px-10 py-12 max-[768px]:px-6 max-[768px]:py-8 bg-linear-to-br from-forest to-ink">
            <motion.p
              className="text-blue-light font-display text-sm uppercase tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease }}
            >
              Available on Steam
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
              className="text-muted text-base leading-relaxed"
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
            >
              <SteamButtonAnimated
                label="JOGAR AGORA"
                variant="primary"
                event="steam_cta_final_click"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
