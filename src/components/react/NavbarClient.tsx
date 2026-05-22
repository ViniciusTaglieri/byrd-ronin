import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SteamButtonAnimated } from "./SteamButtonAnimated";
import { SwordSlash } from "./SwordSlash";
import { BambooDecor } from "./BambooDecor";

const NAV_LINKS = [
  { href: "#status", label: "Status" },
  { href: "#trailer", label: "Trailer" },
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "Gameplay" },
];

export function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slashActive, setSlashActive] = useState(false);

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

  function handleMenuToggle() {
    if (!menuOpen) {
      setSlashActive(true);
      setTimeout(() => setSlashActive(false), 700);
    }
    setMenuOpen((o) => !o);
  }

  function handleLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <SwordSlash trigger={slashActive} variant="medium" />

      <motion.header
        className="fixed z-40 top-0 left-1/2 -translate-x-1/2 grid grid-cols-[auto_1fr_auto] max-[980px]:grid-cols-[auto_auto] items-center gap-7 max-[640px]:gap-3 w-[min(1180px,calc(100%-28px))] max-[640px]:w-[calc(100%-18px)] min-h-[72px] mt-3.5 px-3.5 max-[640px]:p-2 py-2.5 border border-bamboo/30 rounded-lg backdrop-blur-[12px] overflow-hidden"
        style={{
          background: scrolled
            ? "rgba(11,18,16,0.99)"
            : "linear-gradient(135deg,#0d1a0f 0%,#0b1210 100%)",
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.6),0 0 0 1px rgba(107,143,94,0.12)"
            : "0 24px 60px rgba(0,0,0,0.4)",
          transition: "background 300ms ease, box-shadow 300ms ease",
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <BambooDecor
          side="left"
          opacity={0.18}
          style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
        />
        <BambooDecor
          side="right"
          opacity={0.18}
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
        />

        <a href="#top" aria-label="Byrd Ronin home">
          <img
            src="/logo.png"
            alt="Byrd Ronin"
            width="192"
            height="108"
            className="w-[118px] max-[640px]:w-[94px] h-auto"
          />
        </a>

        <nav
          className="flex justify-center gap-[26px] text-[#dceefe] font-display text-[18px] tracking-[0.08em] max-[980px]:hidden"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative pb-0.5 text-[#dceefe] transition-colors duration-[160ms] hover:text-blue-light group"
            >
              {label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-blue-light scale-x-0 origin-left transition-transform duration-[220ms] group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SteamButtonAnimated
            label="JOGAR AGORA"
            event="steam_cta_navbar_click"
            className="max-[640px]:!min-h-[42px] max-[640px]:!px-[11px] max-[640px]:!py-[10px] max-[640px]:!text-[14px]"
          />

          <button
            className="hidden max-[980px]:flex items-center justify-center w-11 h-11 p-2 border-2 border-white/20 rounded-md text-white bg-transparent cursor-pointer transition-[border-color,background] duration-[160ms] hover:border-blue-light hover:bg-[rgba(73,194,242,0.08)]"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={handleMenuToggle}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <motion.rect
                x="4" y="7" width="20" height="2.5" rx="1" fill="currentColor"
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: "center" }}
              />
              <motion.rect
                x="4" y="13" width="20" height="2.5" rx="1" fill="currentColor"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.rect
                x="4" y="19" width="20" height="2.5" rx="1" fill="currentColor"
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: "center" }}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed top-[100px] max-[640px]:top-[88px] left-1/2 -translate-x-1/2 z-[39] flex flex-col gap-1 w-[min(1180px,calc(100%-28px))] p-4 border border-bamboo/[0.35] rounded-lg bg-[rgba(13,26,15,0.97)] backdrop-blur-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.6),4px_4px_0_rgba(107,143,94,0.35)]"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.a
                key={href}
                href={href}
                className="px-4 py-[14px] rounded-md text-[#dceefe] font-display text-[20px] transition-[background,color] duration-[160ms] hover:bg-[rgba(73,194,242,0.1)] hover:text-blue-light"
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                {label}
              </motion.a>
            ))}
            <div className="mt-2 pt-3 border-t border-white/10">
              <SteamButtonAnimated
                label="JOGAR AGORA"
                event="steam_cta_mobile_click"
                className="w-full !justify-center"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
