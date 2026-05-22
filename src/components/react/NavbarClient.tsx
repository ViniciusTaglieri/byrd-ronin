import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const NAV_LINKS = [
  { href: "#status", label: "Status" },
  { href: "#trailer", label: "Trailer" },
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "Gameplay" },
];

function Leaf({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="currentColor"
      className="text-bamboo/70"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path d="M0,4.5 Q5,0 16,2 Q5,5.5 0,4.5Z" />
    </svg>
  );
}

function BambooNavStalk({ side }: { side: "left" | "right" }) {
  const isRight = side === "right";
  return (
    <div
      className={`absolute top-0 bottom-0 ${isRight ? "right-0" : "left-0"} w-10 flex flex-col items-center pointer-events-none`}
      aria-hidden="true"
    >
      <div className="w-2.5 flex-1 bg-bamboo/40 rounded-t-sm" />

      <div className="relative flex-none w-5 h-5 border-2 border-bamboo/60 rounded-full bg-bamboo/15 z-10">
        <motion.div
          className={`absolute top-0.5 ${isRight ? "-left-5" : "-right-5"}`}
          animate={{ rotate: isRight ? [3, -3, 3] : [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          style={{ originX: isRight ? 1 : 0 }}
        >
          <Leaf flipped={isRight} />
        </motion.div>
      </div>

      <div className="w-2.5 flex-1 bg-bamboo/40" />

      <div className="relative flex-none w-4 h-4 border-2 border-bamboo/50 rounded-full bg-bamboo/10 z-10">
        <motion.div
          className={`absolute top-0 ${isRight ? "-left-4" : "-right-4"}`}
          animate={{ rotate: isRight ? [4, -4, 4] : [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 1.1, ease: "easeInOut" }}
          style={{ originX: isRight ? 1 : 0 }}
        >
          <Leaf flipped={isRight} />
        </motion.div>
      </div>

      <div className="w-2.5 flex-1 bg-bamboo/40 rounded-b-sm" />
    </div>
  );
}

export function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      const nav = document.getElementById("mobile-menu");
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    setTimeout(() => document.addEventListener("click", close), 10);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed z-40 top-0 left-1/2 -translate-x-1/2 grid grid-cols-[auto_1fr_auto] max-[980px]:grid-cols-[auto_auto] items-center gap-6 w-[min(1180px,calc(100%-28px))] min-h-18 mt-3.5 px-10 max-[640px]:px-4 py-2.5 border border-bamboo/20 rounded-xl overflow-hidden"
        style={{
          background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.10), 0 1px 0 rgba(107,143,94,0.15)"
            : "0 8px 32px rgba(0,0,0,0.06)",
          transition: "background 300ms ease, box-shadow 300ms ease",
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <BambooNavStalk side="left" />
        <BambooNavStalk side="right" />

        {/* Logo */}
        <a href="#top" aria-label="Byrd Ronin home">
          <img
            src="/logo.png"
            alt="Byrd Ronin"
            width="192"
            height="108"
            className="w-28 max-[640px]:w-24 h-auto"
          />
        </a>

        {/* Links centrais — desktop */}
        <nav
          className="flex justify-end gap-6 max-[980px]:hidden"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative pb-0.5 text-ink font-display text-base tracking-wide transition-colors duration-150 hover:text-bamboo group"
            >
              {label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-bamboo scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Direita: Steam + hamburger */}
        <div className="flex items-center gap-3">
          <SteamButtonAnimated
            label="JOGAR AGORA"
            event="steam_cta_navbar_click"
            className="max-[640px]:min-h-11 max-[640px]:px-3 max-[640px]:text-sm"
          />

          <button
            className="hidden max-[980px]:flex items-center justify-center w-11 h-11 p-2 border-2 border-bamboo/30 rounded-lg text-ink bg-transparent cursor-pointer transition-colors duration-150 hover:border-bamboo hover:bg-bamboo/10"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <motion.rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: "center" }}
              />
              <motion.rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor"
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: "center" }}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed top-24 max-[640px]:top-20 left-1/2 -translate-x-1/2 z-39 flex flex-col gap-1 w-[min(1180px,calc(100%-28px))] p-4 border border-bamboo/25 rounded-xl bg-cream shadow-xl"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.a
                key={href}
                href={href}
                className="px-4 py-3.5 rounded-lg text-ink font-display text-xl transition-colors duration-150 hover:bg-bamboo/10 hover:text-bamboo"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                {label}
              </motion.a>
            ))}
            <div className="mt-2 pt-3 border-t border-bamboo/20">
              <SteamButtonAnimated
                label="JOGAR AGORA"
                event="steam_cta_mobile_click"
                className="w-full justify-center"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
