import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { ease } from "../../lib/motion";

const faqs = [
  {
    q: "O jogo suporta controle?",
    a: "Sim. Byrd Ronin tem suporte nativo a controles via Steam Input, incluindo Xbox, PlayStation e qualquer controle genérico compatível com XInput. Você pode jogar com teclado + mouse ou controle sem precisar configurar nada.",
  },
  {
    q: "Quais idiomas estão disponíveis?",
    a: "O jogo está disponível em Português (Brasil) e Inglês. Textos de interface, tutoriais e menus estão totalmente localizados. Novos idiomas poderão ser adicionados em atualizações futuras.",
  },
  {
    q: "Como funciona o sistema de save?",
    a: "O progresso é salvo automaticamente entre runs. Ao morrer, você retorna ao hub com os upgrades permanentes que desbloqueou. Não há save manual durante uma run ativa — o roguelite exige que você complete a rodada de uma vez.",
  },
  {
    q: "O jogo tem DRM?",
    a: "Byrd Ronin usa exclusivamente o sistema de DRM da Steam. Não há camadas adicionais de proteção de terceiros. Uma vez comprado, você pode jogar offline através do modo offline da Steam.",
  },
  {
    q: "Quais são os requisitos mínimos?",
    a: "SO: Windows 10 (64-bit) · CPU: Intel Core i3 / AMD equivalente · RAM: 4 GB · GPU: Placa integrada com suporte a DirectX 11 · Armazenamento: ~500 MB. O jogo é 2D pixel art otimizado para rodar bem em hardware modesto.",
  },
  {
    q: "Onde posso comprar e qual o preço?",
    a: "Byrd Ronin está disponível na Steam por R$ 9,99. Você também pode encontrá-lo na itch.io. O jogo é vendido uma única vez — sem assinaturas, sem microtransações, sem DLCs pagos.",
  },
];

const ChevronIcon = () => (
  <svg
    className="w-4 h-4 shrink-0 text-bamboo transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 6l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function FAQSection() {
  return (
    <section className="relative py-8 border-t border-bamboo/10">
      <div className="w-container-narrow mx-auto">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="mb-3 text-bamboo font-display text-base uppercase tracking-widest">
            Dúvidas Frequentes
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
            FAQ
          </h2>
        </motion.div>

        <motion.div
          className="overflow-y-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
        >
          <Accordion.Root
            type="single"
            collapsible
            className="flex flex-col gap-2"
          >
            {faqs.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="group rounded border border-white/8 bg-white/3 overflow-hidden transition-colors duration-200 data-[state=open]:border-bamboo/30 data-[state=open]:bg-bamboo/5"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer">
                    <span className="font-display text-base md:text-lg text-white/90 group-data-[state=open]:text-bamboo transition-colors duration-200">
                      {item.q}
                    </span>
                    <ChevronIcon />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="px-5 pb-5 pt-1 text-muted text-base md:text-lg leading-relaxed">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
