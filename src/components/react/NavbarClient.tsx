import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SteamButtonAnimated } from "./SteamButtonAnimated";
import { ease } from "../../lib/motion";

const NAV_LINKS = [
  { href: "#trailer", label: "Trailer" },
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "Gameplay" },
];

export function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed z-40 top-0 left-1/2 -translate-x-1/2 w-navbar mt-3.5 rounded overflow-hidden border border-bamboo/20"
        style={{
          background: scrolled ? "rgba(5,5,5,0.97)" : "rgba(5,5,5,0.86)",
          backdropFilter: "blur(18px)",
          boxShadow: scrolled
            ? "0 4px 28px rgba(0,0,0,0.55), 0 1px 0 rgba(107,143,94,0.15)"
            : "0 8px 36px rgba(0,0,0,0.35)",
          transition: "background 300ms ease, box-shadow 300ms ease",
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: ease }}
      >
        {/* Main row — always 3-col: logo | center | right */}
        <div className="grid grid-cols-navbar items-center gap-4 px-7 mobile:px-5 py-4">
          {/* Col 1: Logo */}
          <a href="#top" aria-label="Byrd Ronin home">
            <img
              src={`${import.meta.env.BASE_URL}logos/logo_byrdronin.png`}
              alt="Byrd Ronin"
              width="192"
              height="108"
              className="w-32 mobile:w-24 h-auto"
            />
          </a>

          {/* Col 2: Nav links (desktop) / CTA centered (tablet+mobile) */}
          <div className="flex items-center">
            {/* Desktop: nav links right-aligned */}
            <nav
              className="w-full flex items-center justify-end tablet:hidden"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }, i) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <div key={href} className="flex items-center">
                    {i > 0 && (
                      <div className="w-px h-4.5 bg-bamboo/18 mx-1 shrink-0" />
                    )}
                    <a
                      href={href}
                      className={`relative px-4 py-2 font-display text-sm tracking-wide rounded-sm transition-colors duration-200 hover:text-bamboo group ${
                        isActive ? "text-bamboo" : "text-white/72"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-bg"
                          className="absolute inset-0 rounded-sm"
                          style={{ background: "rgba(107,143,94,0.13)" }}
                          transition={{ duration: 0.22, ease: ease }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 left-4 right-4 h-px bg-bamboo scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100"
                      />
                    </a>
                  </div>
                );
              })}
            </nav>

            {/* Tablet/Mobile: CTA centered */}
            <div className="w-full hidden tablet:flex justify-center">
              <SteamButtonAnimated
                label="JOGAR AGORA"
                event="steam_cta_navbar_click"
                className="mobile:min-h-11 mobile:px-4 mobile:text-sm"
              />
            </div>
          </div>

          {/* Col 3: CTA (desktop only) + hamburger (tablet/mobile only) */}
          <div className="flex items-center gap-3 justify-self-end">
            <SteamButtonAnimated
              label="JOGAR AGORA"
              event="steam_cta_navbar_click"
              className="tablet:hidden"
            />

            <button
              className="hidden tablet:flex items-center justify-center w-11 h-11 p-2 border-2 border-white/20 rounded-sm text-white bg-transparent cursor-pointer transition-colors duration-150 hover:border-bamboo hover:bg-bamboo/10"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
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
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed top-22 mobile:top-20 left-1/2 -translate-x-1/2 z-menu flex flex-col gap-1 w-navbar p-4 border border-bamboo/25 rounded bg-black shadow-xl"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: ease }}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.a
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3.5 rounded-sm text-white/80 font-display text-xl transition-colors duration-150 hover:bg-bamboo/10 hover:text-bamboo"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                <span className="font-display text-sm text-bamboo/45 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
