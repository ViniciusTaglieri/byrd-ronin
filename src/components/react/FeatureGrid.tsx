import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { ease } from "../../lib/motion";

const features = [
  {
    icon: `${import.meta.env.BASE_URL}images/features_upgrades.png`,
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
  },
  {
    icon: `${import.meta.env.BASE_URL}images/features_inimigos.png`,
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
  },
  {
    icon: `${import.meta.env.BASE_URL}images/features_caos.png`,
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  hovered: {
    y: -4,
    borderColor: "rgba(107,143,94,0.55)",
    backgroundColor: "rgba(107,143,94,0.06)",
    boxShadow: "6px 6px 0 rgba(107,143,94,0.50)",
    transition: { duration: 0.15 },
  },
};

function CornerDecor() {
  return (
    <>
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
    </>
  );
}

function FeatureCard({ icon, title, text }: (typeof features)[number]) {
  return (
    <motion.article
      className="group relative border border-bamboo/15 p-9 flex flex-col items-center gap-5 cursor-default overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(107,143,94,0.04) 100%)",
      }}
      variants={cardVariants}
      whileHover="hovered"
    >
      <CornerDecor />

      <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-black/40 border border-bamboo/15">
        <img
          src={icon}
          alt=""
          width="64"
          height="64"
          aria-hidden="true"
          className="w-16 h-16 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <h3 className="relative z-10 font-display text-3xl text-white text-center leading-tight">
        {title}
      </h3>

      <div className="relative z-10 w-14 h-px bg-bamboo/50" />

      <p className="relative z-10 text-muted text-sm leading-relaxed text-center">
        {text}
      </p>
    </motion.article>
  );
}

function FeatureCarousel() {
  const TOTAL = features.length;
  // Slide order: [clone-of-last, ...real items, clone-of-first]
  const slides = [features[TOTAL - 1], ...features, features[0]];

  // Start at index 1 (first real item)
  const [current, setCurrent] = useState(1);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  // Position x at the first real item after mount (index 1)
  useLayoutEffect(() => {
    const w = containerRef.current?.offsetWidth ?? 0;
    if (w > 0) x.set(-(1 * w));
  }, []);

  function getWidth() {
    return containerRef.current?.offsetWidth ?? 320;
  }

  function goTo(index: number) {
    if (animating.current) return;
    animating.current = true;
    const w = getWidth();

    animate(x, -(index * w), {
      duration: 0.35,
      ease,
      onComplete: () => {
        // Silently jump from clone to the real item
        if (index === 0) {
          x.set(-(TOTAL * w));
          setCurrent(TOTAL);
        } else if (index === TOTAL + 1) {
          x.set(-w);
          setCurrent(1);
        } else {
          setCurrent(index);
        }
        animating.current = false;
      },
    });
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const threshold = getWidth() * 0.25;
    if (info.offset.x < -threshold) goTo(current + 1);
    else if (info.offset.x > threshold) goTo(current - 1);
    else {
      // snap back without the animation guard
      animate(x, -(current * getWidth()), { duration: 0.25, ease });
    }
  }

  // Dot index is 0-based (maps clones back to real items)
  const dotActive =
    current === 0 ? TOTAL - 1 :
    current === TOTAL + 1 ? 0 :
    current - 1;

  return (
    <div className="flex flex-col gap-5">
      {/* Carousel track + side arrows */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Item anterior"
          onClick={() => goTo(current - 1)}
          className="shrink-0 flex items-center justify-center w-9 h-9 border border-bamboo/30 rounded-sm text-bamboo/60 transition-colors duration-150 hover:border-bamboo hover:text-bamboo"
        >
          ←
        </button>

        <div ref={containerRef} className="flex-1 overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            style={{ x }}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
          >
            {slides.map((f, i) => (
              <div key={`${f.title}-${i}`} className="w-full shrink-0">
                <FeatureCard {...f} />
              </div>
            ))}
          </motion.div>
        </div>

        <button
          aria-label="Próximo item"
          onClick={() => goTo(current + 1)}
          className="shrink-0 flex items-center justify-center w-9 h-9 border border-bamboo/30 rounded-sm text-bamboo/60 transition-colors duration-150 hover:border-bamboo hover:text-bamboo"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div
        className="flex justify-center gap-2.5"
        role="tablist"
        aria-label="Feature navigation"
      >
        {features.map((f, i) => (
          <button
            key={f.title}
            role="tab"
            aria-selected={i === dotActive}
            aria-label={f.title}
            onClick={() => goTo(i + 1)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === dotActive ? "bg-bamboo" : "bg-bamboo/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

export function FeatureGrid() {
  return (
    <>
      {/* Desktop grid — oculto no phablet */}
      <motion.div
        className="hidden md:grid md:grid-cols-3 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </motion.div>

      {/* Mobile carousel — oculto no desktop */}
      <div className="block md:hidden">
        <FeatureCarousel />
      </div>
    </>
  );
}
