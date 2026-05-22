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
        className="navbar"
        style={{
          background: scrolled ? "rgba(11,18,16,0.99)" : undefined,
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(107,143,94,0.12)"
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

        <a className="brand" href="#top" aria-label="Byrd Ronin home">
          <img src="/logo.png" alt="Byrd Ronin" width="192" height="108" />
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="navbar-right">
          <SteamButtonAnimated
            label="JOGAR AGORA"
            event="steam_cta_navbar_click"
          />

          <button
            className="hamburger"
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
            className="mobile-menu"
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
                className="mobile-link"
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                {label}
              </motion.a>
            ))}
            <div className="mobile-cta">
              <SteamButtonAnimated
                label="JOGAR AGORA"
                event="steam_cta_mobile_click"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
