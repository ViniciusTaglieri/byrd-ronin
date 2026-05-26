# Visual Improvements — Byrd Ronin Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply a full visual overhaul to the Byrd Ronin landing page — evolving the pixel art aesthetic with bamboo/nature thematic elements across all 10 sections.

**Architecture:** Global components (SteamIcon, BambooDecor, FallingLeaves, SectionWave) are built first, then integrated into each section top-to-bottom. CSS changes accompany each task rather than being batched. All new React components go in `src/components/react/`.

**Tech Stack:** Astro 5.8, React 19, Tailwind v4, Framer Motion, TypeScript, plain SVG (no icon library)

**Spec:** `docs/superpowers/specs/2026-05-22-visual-improvements-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/styles/global.css` | Modify | Add bamboo/earth/mist tokens; update navbar, status, card CSS |
| `src/components/react/SteamIcon.tsx` | Create | Inline Steam SVG component |
| `src/components/react/SteamButtonAnimated.tsx` | Modify | Replace text badge with SteamIcon |
| `src/components/react/BambooDecor.tsx` | Create | Reusable bamboo stalk SVG decoration |
| `src/components/react/FallingLeaves.tsx` | Create | CSS-animated falling leaves |
| `src/components/react/SectionWave.tsx` | Create | SVG wave section divider |
| `src/components/react/NavbarClient.tsx` | Modify | New background, border, BambooDecor, letter-spacing |
| `src/components/react/HeroAnimations.tsx` | Modify | Remove logo, highlight keywords, update description style |
| `src/components/HeroSection.astro` | Modify | Add FallingLeaves, SectionWave |
| `src/components/StatusSection.astro` | Modify | Card styles, BambooDecor |
| `src/components/TrailerSection.astro` | Modify | 2-column layout, text column, waves |
| `src/components/react/FeatureGrid.tsx` | Modify | Icon container, card styles, alternating layout |
| `src/consts.ts` | Modify | Add title+context to GAMEPLAY_CLIPS, add GameplayClip interface |
| `src/components/react/GameplayGridClient.tsx` | Modify | Remove badge, structured figcaption, blur entry animation |
| `src/components/react/FinalCTAClient.tsx` | Modify | 2-col container, FallingLeaves, updated CTA label |
| `src/components/Footer.astro` | Modify | 4-col grid, identity/sitemap/download/studio columns |

---

## Task 1: Design System Tokens

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add new palette tokens to `@theme` and `:root`**

In `src/styles/global.css`, add inside the `@theme { }` block after `--color-muted`:

```css
--color-bamboo: #6b8f5e;
--color-earth:  #8b6f47;
--color-mist:   rgba(180, 210, 180, 0.08);
```

And inside `:root { }` after `--muted`:

```css
--bamboo: #6b8f5e;
--earth:  #8b6f47;
--mist:   rgba(180, 210, 180, 0.08);
```

- [ ] **Step 2: Verify TypeScript build still compiles**

```bash
cd "C:\Users\vinicius.taglieri\Projetos\Website Byrd Ronin"
npx astro check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add bamboo/earth/mist palette tokens"
```

---

## Task 2: SteamIcon Component

**Files:**
- Create: `src/components/react/SteamIcon.tsx`
- Modify: `src/components/react/SteamButtonAnimated.tsx`

- [ ] **Step 1: Create `SteamIcon.tsx`**

```tsx
// src/components/react/SteamIcon.tsx
interface Props {
  size?: number;
  className?: string;
}

export function SteamIcon({ size = 20, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.607 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
    </svg>
  );
}
```

- [ ] **Step 2: Integrate into `SteamButtonAnimated.tsx`**

Replace the import line and the `<span className="steam-mark">STEAM</span>` element:

```tsx
// src/components/react/SteamButtonAnimated.tsx
import { motion } from "framer-motion";
import { STEAM_URL } from "../../consts";
import { SteamIcon } from "./SteamIcon";

interface Props {
  label?: string;
  variant?: "primary" | "secondary";
  event?: string;
  className?: string;
}

export function SteamButtonAnimated({
  label = "JOGAR AGORA",
  variant = "primary",
  event = "steam_cta_click",
  className,
}: Props) {
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={STEAM_URL}
      target="_blank"
      rel="noreferrer"
      data-event={event}
      className={["steam-button", variant, "steam-button--animated", className]
        .filter(Boolean)
        .join(" ")}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: {
          scale: 1,
          y: 0,
          boxShadow: isPrimary
            ? "0 8px 0 #870707, 0 18px 36px rgba(242,19,19,0.28)"
            : "0 6px 0 #7a740d",
        },
        hover: {
          scale: 1.04,
          y: -2,
          boxShadow: isPrimary
            ? "0 10px 0 #870707, 0 22px 44px rgba(242,19,19,0.42)"
            : "0 8px 0 #7a740d, 0 16px 32px rgba(191,181,44,0.3)",
          transition: { duration: 0.15, ease: "easeOut" },
        },
        tap: {
          scale: 0.97,
          y: 3,
          boxShadow: isPrimary
            ? "0 4px 0 #870707"
            : "0 3px 0 #7a740d",
          transition: { duration: 0.08 },
        },
      }}
    >
      <SteamIcon size={18} />
      <span>{label}</span>

      {/* Shimmer overlay */}
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "200% 0",
          pointerEvents: "none",
        }}
        variants={{
          rest: { backgroundPosition: "200% 0" },
          hover: {
            backgroundPosition: "-100% 0",
            transition: { duration: 0.55, ease: "easeInOut" },
          },
        }}
      />
    </motion.a>
  );
}
```

- [ ] **Step 3: Run type check**

```bash
npx astro check
```

Expected: no errors.

- [ ] **Step 4: Start dev server and verify button renders Steam icon**

```bash
npm run dev
```

Open `http://localhost:4321`. All Steam buttons should show the Steam SVG icon in place of the "STEAM" text badge.

- [ ] **Step 5: Commit**

```bash
git add src/components/react/SteamIcon.tsx src/components/react/SteamButtonAnimated.tsx
git commit -m "feat: SteamIcon component, integrate into SteamButtonAnimated"
```

---

## Task 3: BambooDecor Component

**Files:**
- Create: `src/components/react/BambooDecor.tsx`

- [ ] **Step 1: Create `BambooDecor.tsx`**

```tsx
// src/components/react/BambooDecor.tsx
import type { CSSProperties } from "react";

interface Props {
  side: "left" | "right";
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

export function BambooDecor({ side, opacity = 0.20, className, style }: Props) {
  const isRight = side === "right";

  return (
    <svg
      width="56"
      height="220"
      viewBox="0 0 56 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, color: "var(--bamboo, #6b8f5e)", ...style }}
      aria-hidden="true"
    >
      {/* Main stalk */}
      <rect x="24" y="0" width="8" height="200" rx="3" fill="currentColor" />

      {/* Node bands */}
      <rect x="20" y="44"  width="16" height="5" rx="2" fill="currentColor" />
      <rect x="20" y="88"  width="16" height="5" rx="2" fill="currentColor" />
      <rect x="20" y="132" width="16" height="5" rx="2" fill="currentColor" />
      <rect x="20" y="176" width="16" height="5" rx="2" fill="currentColor" />

      {/* Second thinner stalk */}
      <rect x={isRight ? 10 : 40} y="30" width="5" height="160" rx="2" fill="currentColor" opacity="0.6" />
      <rect x={isRight ? 7  : 37} y="74"  width="11" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x={isRight ? 7  : 37} y="118" width="11" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x={isRight ? 7  : 37} y="162" width="11" height="4" rx="1" fill="currentColor" opacity="0.6" />

      {/* Leaves — branch left for left side, branch right for right side */}
      {!isRight ? (
        <>
          <ellipse cx="14" cy="42" rx="13" ry="4" fill="currentColor"
            transform="rotate(-35 14 42)" opacity="0.85" />
          <ellipse cx="10" cy="86" rx="15" ry="4" fill="currentColor"
            transform="rotate(-45 10 86)" opacity="0.75" />
          <ellipse cx="16" cy="130" rx="12" ry="4" fill="currentColor"
            transform="rotate(-28 16 130)" opacity="0.80" />
        </>
      ) : (
        <>
          <ellipse cx="42" cy="42" rx="13" ry="4" fill="currentColor"
            transform="rotate(35 42 42)" opacity="0.85" />
          <ellipse cx="46" cy="86" rx="15" ry="4" fill="currentColor"
            transform="rotate(45 46 86)" opacity="0.75" />
          <ellipse cx="40" cy="130" rx="12" ry="4" fill="currentColor"
            transform="rotate(28 40 130)" opacity="0.80" />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx astro check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/BambooDecor.tsx
git commit -m "feat: BambooDecor SVG component (pixel-art bamboo stalks)"
```

---

## Task 4: FallingLeaves Component

**Files:**
- Create: `src/components/react/FallingLeaves.tsx`

- [ ] **Step 1: Create `FallingLeaves.tsx`**

```tsx
// src/components/react/FallingLeaves.tsx
import { useEffect, useRef, useState } from "react";

interface Leaf {
  id: number;
  shape: 0 | 1 | 2;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Props {
  mode?: "ambient" | "section";
  count?: number;
}

const LEAF_PATHS = [
  "M0,-9 C5,-7 7,-1 5,6 C2,9 -2,9 -5,6 C-7,-1 -5,-7 0,-9Z",
  "M0,-10 C6,-5 8,1 4,8 C0,6 -4,8 -8,1 C-6,-5 0,-10 0,-10Z",
  "M0,-8 C3,-8 7,-3 7,2 C7,6 3,9 0,8 C-3,9 -7,6 -7,2 C-7,-3 -3,-8 0,-8Z",
];

function makeLeaves(count: number): Leaf[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: (i % 3) as 0 | 1 | 2,
    size: 9 + Math.random() * 9,
    left: Math.random() * 98,
    duration: 9 + Math.random() * 10,
    delay: Math.random() * 14,
    opacity: 0.4 + Math.random() * 0.3,
  }));
}

export function FallingLeaves({ mode = "ambient", count = 15 }: Props) {
  const [active, setActive] = useState(false);
  const [leaves] = useState(() => makeLeaves(count));
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    if (mode === "ambient") {
      setActive(true);
      return;
    }

    // section mode: activate once when parent enters viewport
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(parent);
    return () => obs.disconnect();
  }, [mode]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes leaf-fall-a {
          0%   { transform: translateY(-20px) rotate(0deg)   translateX(0px); }
          25%  { transform: translateY(25vh)  rotate(45deg)  translateX(28px); }
          50%  { transform: translateY(52vh)  rotate(90deg)  translateX(-18px); }
          75%  { transform: translateY(76vh)  rotate(135deg) translateX(22px); }
          100% { transform: translateY(108vh) rotate(180deg) translateX(-8px); }
        }
        @keyframes leaf-fall-b {
          0%   { transform: translateY(-20px) rotate(0deg)   translateX(0px); }
          33%  { transform: translateY(34vh)  rotate(-55deg) translateX(-36px); }
          66%  { transform: translateY(66vh)  rotate(-115deg) translateX(32px); }
          100% { transform: translateY(108vh) rotate(-175deg) translateX(-12px); }
        }
        @keyframes leaf-fall-c {
          0%   { transform: translateY(-20px) rotate(20deg)  translateX(0px); }
          20%  { transform: translateY(22vh)  rotate(52deg)  translateX(18px); }
          40%  { transform: translateY(44vh)  rotate(84deg)  translateX(-28px); }
          60%  { transform: translateY(63vh)  rotate(128deg) translateX(14px); }
          80%  { transform: translateY(82vh)  rotate(162deg) translateX(-22px); }
          100% { transform: translateY(108vh) rotate(198deg) translateX(8px); }
        }
      `}</style>

      {active &&
        leaves.map((leaf) => {
          const animName = (["leaf-fall-a", "leaf-fall-b", "leaf-fall-c"] as const)[leaf.shape];
          return (
            <svg
              key={leaf.id}
              width={leaf.size}
              height={leaf.size}
              viewBox="-10 -10 20 20"
              style={{
                position: "absolute",
                top: "-20px",
                left: `${leaf.left}%`,
                opacity: leaf.opacity,
                color: "var(--bamboo, #6b8f5e)",
                animation: `${animName} ${leaf.duration}s ${leaf.delay}s infinite linear`,
                willChange: "transform",
              }}
            >
              <path d={LEAF_PATHS[leaf.shape]} fill="currentColor" />
            </svg>
          );
        })}
    </div>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx astro check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/FallingLeaves.tsx
git commit -m "feat: FallingLeaves CSS-animated component with prefers-reduced-motion support"
```

---

## Task 5: SectionWave Component

**Files:**
- Create: `src/components/react/SectionWave.tsx`

- [ ] **Step 1: Create `SectionWave.tsx`**

```tsx
// src/components/react/SectionWave.tsx
interface Props {
  position: "top" | "bottom";
  color: string;
  className?: string;
}

export function SectionWave({ position, color, className }: Props) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        [position]: -1,
        lineHeight: 0,
        zIndex: 2,
        transform: position === "top" ? "rotate(180deg)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "52px" }}
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,26 C180,52 360,0 540,26 C720,52 900,0 1080,26 C1260,52 1380,10 1440,26 L1440,52 L0,52 Z" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx astro check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/SectionWave.tsx
git commit -m "feat: SectionWave SVG divider component"
```

---

## Task 6: Navbar

**Files:**
- Modify: `src/components/react/NavbarClient.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update navbar CSS in `global.css`**

Replace the `.navbar` rule:

```css
.navbar {
  position: fixed;
  z-index: 40;
  top: 0;
  left: 50%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 28px;
  width: min(1180px, calc(100% - 28px));
  min-height: 72px;
  margin-top: 14px;
  padding: 10px 14px;
  transform: translateX(-50%);
  border: 1px solid rgba(107, 143, 94, 0.30);
  border-radius: 8px;
  background: linear-gradient(135deg, #0d1a0f 0%, #0b1210 100%);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  overflow: hidden;
}
```

Replace the `.nav-links` rule (add letter-spacing):

```css
.nav-links {
  display: flex;
  justify-content: center;
  gap: 26px;
  color: #dceefe;
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0.08em;
}
```

Replace the `.mobile-menu` rule (update border color):

```css
.mobile-menu {
  position: fixed;
  top: 100px;
  left: 50%;
  z-index: 39;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: min(1180px, calc(100% - 28px));
  padding: 16px;
  border: 1px solid rgba(107, 143, 94, 0.35);
  border-radius: 8px;
  background: rgba(13, 26, 15, 0.97);
  backdrop-filter: blur(20px);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.6),
    4px 4px 0 rgba(107, 143, 94, 0.35);
  transform: translateX(-50%);
}
```

- [ ] **Step 2: Add BambooDecor to NavbarClient**

In `src/components/react/NavbarClient.tsx`, add the import and the two decorations inside the `<motion.header>` element:

```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SteamButtonAnimated } from "./SteamButtonAnimated";
import { SwordSlash } from "./SwordSlash";
import { BambooDecor } from "./BambooDecor";

// ... (NAV_LINKS array unchanged)

// Inside <motion.header>, add as first and last children:
<motion.header
  className="navbar"
  style={{
    background: scrolled
      ? "rgba(11, 18, 16, 0.99)"
      : undefined,          // gradient from CSS handles default
    boxShadow: scrolled
      ? "0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(107,143,94,0.12)"
      : "0 24px 60px rgba(0,0,0,0.4)",
    transition: "background 300ms ease, box-shadow 300ms ease",
  }}
  initial={{ y: -30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
>
  {/* Bamboo decorations */}
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

  {/* Logo */}
  <a className="brand" href="#top" aria-label="Byrd Ronin home">
    <img src="/logo.png" alt="Byrd Ronin" width="192" height="108" />
  </a>

  {/* Desktop nav links */}
  <nav className="nav-links" aria-label="Main navigation">
    {NAV_LINKS.map(({ href, label }) => (
      <a key={href} href={href} className="nav-link">
        {label}
      </a>
    ))}
  </nav>

  {/* Desktop CTA + Mobile hamburger */}
  <div className="navbar-right">
    <SteamButtonAnimated
      label="JOGAR AGORA"
      event="steam_cta_navbar_click"
    />
    {/* ... hamburger button unchanged ... */}
  </div>
</motion.header>
```

Full file with all changes applied:

```tsx
// src/components/react/NavbarClient.tsx
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
```

- [ ] **Step 3: Type check and visual verify**

```bash
npx astro check
```

Then in browser: navbar should show dark green-black gradient, bamboo SVGs on sides, SteamIcon on button.

- [ ] **Step 4: Commit**

```bash
git add src/components/react/NavbarClient.tsx src/styles/global.css
git commit -m "feat: navbar — bamboo theme, refined border, BambooDecor decorations"
```

---

## Task 7: Hero Section

**Files:**
- Modify: `src/components/react/HeroAnimations.tsx`
- Modify: `src/components/HeroSection.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update `HeroAnimations.tsx` — remove logo, highlight keywords, update description**

```tsx
// src/components/react/HeroAnimations.tsx
import { motion } from "framer-motion";
import { PixelParticles } from "./PixelParticles";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const ease = [0.22, 1, 0.36, 1] as const;

const copyVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export function HeroCopy() {
  return (
    <motion.div
      className="hero-copy"
      variants={copyVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Kicker */}
      <motion.p variants={itemVariants} className="availability">
        Available on Steam
      </motion.p>

      {/* H1 — keywords highlighted */}
      <motion.h1 variants={itemVariants}>
        Slice Through{" "}
        <em className="hero-keyword">Chaos.</em>
        {" "}Become the{" "}
        <em className="hero-keyword">Ronin.</em>
      </motion.h1>

      {/* Descrição */}
      <motion.p variants={itemVariants} className="hero-text">
        Byrd Ronin é um action roguelite onde cada corte, upgrade e onda de
        inimigos empurra sua run mais fundo no caos de bambu.
      </motion.p>

      {/* Botões */}
      <motion.div variants={itemVariants} className="hero-actions">
        <SteamButtonAnimated
          label="JOGAR AGORA"
          variant="primary"
          event="steam_cta_hero_click"
        />
        <motion.a
          className="ghost-button"
          href="#trailer"
          data-event="trailer_play_click"
          whileHover={{ scale: 1.03, borderColor: "rgba(73,194,242,0.7)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          Assistir Trailer
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export function HeroCharacter() {
  return (
    <motion.div
      className="hero-character"
      aria-hidden="true"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease }}
    >
      <motion.img
        src="/personagem.png"
        alt=""
        width="1536"
        height="864"
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function HeroParticles() {
  return <PixelParticles colors={["#49c2f2", "#bfb52c", "#f8fafc"]} />;
}
```

- [ ] **Step 2: Add `.hero-keyword` and update `.hero-text` in `global.css`**

Add after the `.hero-text` rule:

```css
.hero-keyword {
  color: var(--gold);
  font-style: italic;
}

.hero-text {
  max-width: 610px;
  color: var(--muted);
  font-size: 19px;
  line-height: 1.7;
}
```

Also add a desktop constraint to `.hero-copy` inside the existing desktop styles or as a new rule:

```css
@media (min-width: 981px) {
  .hero-copy {
    max-height: 45vh;
    overflow: visible;
  }
}
```

- [ ] **Step 3: Update `HeroSection.astro` — add FallingLeaves and SectionWave**

```astro
---
import { HeroCopy, HeroCharacter, HeroParticles } from "./react/HeroAnimations";
import { FallingLeaves } from "./react/FallingLeaves";
import { SectionWave } from "./react/SectionWave";
---

<section id="top" class="hero-section">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="hero-shade" aria-hidden="true"></div>

  <!-- Partículas pixel -->
  <HeroParticles client:load />

  <!-- Folhas caindo -->
  <FallingLeaves mode="ambient" count={12} client:load />

  <div class="container hero-grid">
    <HeroCopy client:load />
    <HeroCharacter client:load />
  </div>

  <!-- Wave de transição para StatusSection -->
  <SectionWave position="bottom" color="#0b1210" client:load />
</section>
```

- [ ] **Step 4: Type check and visual verify**

```bash
npx astro check
```

In browser: hero title shows *Chaos* and *Ronin* in gold italic, no logo in hero copy, leaves falling behind content, wave at bottom.

- [ ] **Step 5: Commit**

```bash
git add src/components/react/HeroAnimations.tsx src/components/HeroSection.astro src/styles/global.css
git commit -m "feat: hero — remove logo, keyword highlights, FallingLeaves, SectionWave"
```

---

## Task 8: StatusSection

**Files:**
- Modify: `src/components/StatusSection.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update `.status-section` and `.status-card` CSS**

Replace the existing `.status-section` and `.status-card` rules in `global.css`:

```css
.status-section {
  position: relative;
  z-index: 5;
  margin-top: -72px;
}

.status-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0.92fr;
  gap: 34px;
  padding: 30px;
  border: 1px solid rgba(107, 143, 94, 0.35);
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    rgba(13, 26, 15, 0.97),
    rgba(11, 18, 16, 0.97)
  );
  box-shadow:
    4px 4px 0 rgba(107, 143, 94, 0.45),
    0 32px 80px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.status-card h2 {
  font-size: clamp(34px, 4vw, 52px);
}

.status-card p {
  margin-bottom: 0;
}
```

Replace the `.tag-list span, .status-tag` hover rule:

```css
.tag-list span,
.status-tag {
  display: inline-block;
  padding: 8px 10px;
  border: 1px solid rgba(107, 143, 94, 0.30);
  border-radius: 4px;
  color: #eff8ff;
  background: rgba(5, 5, 5, 0.35);
  font-weight: 800;
  transition:
    border-color 160ms ease,
    background 160ms ease;
}

.status-tag:hover {
  border-color: rgba(107, 143, 94, 0.55);
  background: rgba(107, 143, 94, 0.12);
}
```

- [ ] **Step 2: Update `StatusSection.astro` — add BambooDecor**

```astro
---
import { GAME } from "../consts";
import { SteamButtonAnimated } from "./react/SteamButtonAnimated";
import { StatusAnimations } from "./react/StatusAnimations";
import { BambooDecor } from "./react/BambooDecor";
---

<section id="status" class="status-section">
  <div class="container">
    <StatusAnimations client:visible>
      <div class="status-card">
        <!-- Decoração de bambu no canto direito -->
        <BambooDecor
          side="right"
          opacity={0.10}
          style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)" }}
          client:load
        />

        <div class="status-copy">
          <p class="section-kicker">Available on Steam</p>
          <h2>Fast cuts, upgrades and bamboo-fueled chaos.</h2>
          <p>{GAME.descriptionShort}</p>
        </div>

        <div class="status-meta">
          <div class="tag-list" aria-label="Steam tags">
            {GAME.tags.map((tag) => (
              <span class="status-tag">{tag}</span>
            ))}
          </div>

          <dl class="status-dl">
            <div>
              <dt>Desenvolvedor</dt>
              <dd>{GAME.developer}</dd>
            </div>
            <div>
              <dt>Publisher</dt>
              <dd>{GAME.publisher}</dd>
            </div>
            <div>
              <dt>Lançamento</dt>
              <dd>{GAME.releaseDate}</dd>
            </div>
            <div>
              <dt>Preço</dt>
              <dd>{GAME.price}</dd>
            </div>
          </dl>

          <SteamButtonAnimated
            label="JOGAR AGORA"
            event="steam_cta_strip_click"
            client:visible
          />
        </div>
      </div>
    </StatusAnimations>
  </div>
</section>
```

- [ ] **Step 3: Type check and visual verify**

```bash
npx astro check
```

In browser: status card has rounded green-dark border, green shadow offset, bamboo decor on right, overlaps hero by ~72px.

- [ ] **Step 4: Commit**

```bash
git add src/components/StatusSection.astro src/styles/global.css
git commit -m "feat: status section — bamboo card style, refined shadow, BambooDecor"
```

---

## Task 9: TrailerSection

**Files:**
- Modify: `src/components/TrailerSection.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update trailer CSS in `global.css`**

Replace `.trailer-section` rule and update `.trailer-frame`:

```css
.trailer-section {
  position: relative;
  background: #070b10;
}

.trailer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: center;
}

.trailer-frame {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  border: 1px solid rgba(107, 143, 94, 0.35);
  border-radius: 8px;
  background: var(--black);
  box-shadow:
    4px 4px 0 rgba(191, 181, 44, 0.50),
    0 32px 80px rgba(0, 0, 0, 0.48);
  cursor: pointer;
}

.trailer-copy {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.trailer-copy h2 {
  font-size: clamp(32px, 3.5vw, 52px);
}

.trailer-copy p {
  color: var(--muted);
  font-size: 17px;
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 980px) {
  .trailer-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Refactor `TrailerSection.astro`**

```astro
---
import { TrailerPlayer } from "./react/TrailerPlayer";
import { SectionWave } from "./react/SectionWave";
import { YOUTUBE_TRAILER_ID } from "../consts";
---

<section id="trailer" class="trailer-section section-pad" style="position: relative;">
  <SectionWave position="top" color="#070b10" client:load />

  <div class="container">
    <div class="trailer-grid">
      <!-- Coluna esquerda: player -->
      <div>
        <TrailerPlayer youtubeId={YOUTUBE_TRAILER_ID} client:visible />
      </div>

      <!-- Coluna direita: texto -->
      <div class="trailer-copy">
        <p class="section-kicker">Assista ao Trailer</p>
        <h2>Veja o ritmo da lâmina antes da sua primeira run.</h2>
        <p>
          Cortes rápidos, pressure constante de inimigos e um sistema de
          upgrades que muda tudo a cada rodada — é isso que o trailer mostra.
        </p>
        <p>
          Em Byrd Ronin cada run tem seu próprio ritmo. O trailer captura o
          fluxo de combate que você vai dominar, run após run.
        </p>
        <a class="ghost-button" href="#gameplay" style="align-self: flex-start;">
          Ver mais gameplay →
        </a>
      </div>
    </div>
  </div>

  <SectionWave position="bottom" color="#070b10" client:load />
</section>
```

- [ ] **Step 3: Type check and visual verify**

```bash
npx astro check
```

In browser: trailer section shows 2-col layout (player left, text right), wave dividers top and bottom, refined frame border/shadow.

- [ ] **Step 4: Commit**

```bash
git add src/components/TrailerSection.astro src/styles/global.css
git commit -m "feat: trailer section — 2-col layout, text column, bamboo frame style, waves"
```

---

## Task 10: FeaturesSection

**Files:**
- Modify: `src/components/react/FeatureGrid.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update `.features-section` and `.feature-card` CSS**

Replace relevant rules in `global.css`. Note: `.gameplay-card` is updated separately in Task 11 — only update `.feature-card` here:

```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.feature-card {
  border: 1px solid rgba(107, 143, 94, 0.20);
  border-radius: 8px;
  background: rgba(13, 26, 15, 0.50);
}

.feature-card {
  min-height: 310px;
  padding: 26px;
}

.feature-icon {
  display: inline-grid;
  width: 80px;
  height: 80px;
  place-items: center;
  margin-bottom: 28px;
  border: 1px solid rgba(107, 143, 94, 0.35);
  border-radius: 8px;
  color: var(--gold);
  background: rgba(107, 143, 94, 0.15);
}

.feature-card h3 {
  margin-bottom: 14px;
  letter-spacing: 0.04em;
}

.feature-card p {
  color: var(--muted);
  font-size: 17px;
}

/* Alternating layout for large screens */
@media (min-width: 1024px) {
  .feature-grid--alt {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .feature-card--alt {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 32px;
    align-items: start;
    min-height: auto;
    padding: 32px;
  }

  .feature-card--alt:nth-child(even) {
    grid-template-columns: 1fr auto;
  }

  .feature-card--alt:nth-child(even) .feature-icon {
    order: 2;
  }

  .feature-card--alt .feature-card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
```

- [ ] **Step 2: Add `.feature-card-body` wrapper and bamboo separator to `FeatureGrid.tsx`**

```tsx
// src/components/react/FeatureGrid.tsx
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { UpgradeIcon, EnemyIcon, ChaosIcon } from "./FeatureIcons";
import { SwordSlash } from "./SwordSlash";
import { BambooDecor } from "./BambooDecor";

const ease = [0.22, 1, 0.36, 1] as const;

const features: Array<{ Icon: () => React.ReactElement; title: string; text: string }> = [
  {
    Icon: UpgradeIcon,
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
  },
  {
    Icon: EnemyIcon,
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
  },
  {
    Icon: ChaosIcon,
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

function FeatureCard({
  Icon,
  title,
  text,
}: {
  Icon: () => React.ReactElement;
  title: string;
  text: string;
}) {
  return (
    <motion.article
      className="feature-card feature-card--alt"
      variants={cardVariants}
      whileHover={{
        y: -4,
        borderColor: "rgba(107,143,94,0.55)",
        boxShadow: "4px 4px 0 rgba(107,143,94,0.45), 0 24px 48px rgba(0,0,0,0.4)",
        transition: { duration: 0.2 },
      }}
    >
      <motion.span
        className="feature-icon"
        whileHover={{
          rotate: [-5, 5, -3, 3, 0],
          scale: 1.1,
          transition: { duration: 0.4 },
        }}
      >
        <Icon />
      </motion.span>
      <div className="feature-card-body">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </motion.article>
  );
}

export function FeatureGrid() {
  const [slashActive, setSlashActive] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;
    const section = document.getElementById("features");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setSlashActive(true);
          setHasTriggered(true);
          setTimeout(() => setSlashActive(false), 700);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <>
      <SwordSlash trigger={slashActive} variant="horizontal" />

      {/* Bamboo separator above grid */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px", opacity: 0.15 }}>
        <BambooDecor side="left" opacity={1} style={{ transform: "rotate(90deg)", height: "56px" }} />
      </div>

      <motion.div
        className="feature-grid feature-grid--alt"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </motion.div>
    </>
  );
}
```

- [ ] **Step 3: Type check and visual verify**

```bash
npx astro check
```

In browser (≥1024px): features in alternating icon-left/text-right layout. Mobile: card grid. Icons have bamboo-green container instead of gold background.

- [ ] **Step 4: Commit**

```bash
git add src/components/react/FeatureGrid.tsx src/styles/global.css
git commit -m "feat: features section — alternating layout, bamboo card style, enlarged icons"
```

---

## Task 11: GameplaySection

**Files:**
- Modify: `src/consts.ts`
- Modify: `src/components/react/GameplayGridClient.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update `consts.ts` — add GameplayClip interface and title/context fields**

```ts
// src/consts.ts
export const STEAM_URL =
  "https://store.steampowered.com/app/4378340/Byrd_Ronin/";
export const STEAM_APP_ID = "4378340";
export const YOUTUBE_TRAILER_ID = ""; // preencher quando disponível

export const GAME = {
  title: "Byrd Ronin",
  developer: "RDB's Studio",
  publisher: "RDB's Studio",
  releaseDate: "Fevereiro 2026",
  price: "R$ 9,99",
  rating: "6+",
  tags: [
    "Ação",
    "Roguelike de Ação",
    "Hack and Slash",
    "Difícil",
    "2D",
  ] as const,
  descriptionShort:
    "Byrd Ronin mistura ação 2D intensa com controles precisos e ritmo acelerado. Como um pássaro Ronin, avance destruindo tudo até alcançar a cerejeira que guarda seu juramento.",
  descriptionLong:
    "O combate em Byrd Ronin é rápido, agressivo e recompensador. Saber o momento certo de atacar e contra-atacar é a única constante. Evolua a cada run, desbloqueando itens e habilidades — domine o fluxo de combate e encare o caos.",
} as const;

export interface GameplayClip {
  src: string;
  title: string;
  context: string;
}

// Vídeos nativos: 1170×658px (ratio 585:329 ≈ 16:9)
export const GAMEPLAY_CLIPS: GameplayClip[] = [
  {
    src: "/gameplay1.webm",
    title: "Cortes em alta velocidade",
    context: "Cada swing elimina bambus e inimigos ao mesmo tempo — o ritmo não para.",
  },
  {
    src: "/gameplay2.webm",
    title: "Sobrevivendo à pressão inimiga",
    context: "Inimigos avançam de todos os lados. Timing e posicionamento são tudo.",
  },
];
```

- [ ] **Step 2: Update `GameplayGridClient.tsx` — remove badge, structured caption, blur animation, bamboo card style**

```tsx
// src/components/react/GameplayGridClient.tsx
import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS, type GameplayClip } from "../../consts";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEO_RATIO = "585 / 329";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease },
  },
};

function GameplayCard({ src, title, context }: GameplayClip) {
  return (
    <motion.figure
      className="gameplay-card"
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(107,143,94,0.55)",
        boxShadow:
          "4px 4px 0 rgba(107,143,94,0.45), 0 24px 48px rgba(0,0,0,0.55)",
        transition: { duration: 0.22 },
      }}
      style={{ margin: 0 }}
    >
      <div
        className="gameplay-thumb"
        style={{
          aspectRatio: VIDEO_RATIO,
          position: "relative",
          overflow: "hidden",
          background: "var(--panel)",
        }}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            background: "var(--black)",
            filter: "saturate(1.1) brightness(0.9)",
          }}
        />
        {/* Gradient overlay — softens frame→caption transition */}
        <div className="gameplay-thumb-overlay" aria-hidden="true" />
      </div>

      <figcaption className="gameplay-card-caption">
        <span className="gameplay-caption-title">{title}</span>
        <span className="gameplay-caption-context">{context}</span>
      </figcaption>
    </motion.figure>
  );
}

export function GameplayGridClient() {
  return (
    <motion.div
      className="gameplay-grid gameplay-grid--2col"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {GAMEPLAY_CLIPS.map((clip) => (
        <GameplayCard key={clip.src} {...clip} />
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 3: Add new gameplay CSS rules to `global.css`**

Replace `.gameplay-card` and related rules:

```css
.gameplay-card {
  overflow: hidden;
  margin: 0;
  border: 1px solid rgba(107, 143, 94, 0.25);
  border-radius: 8px;
  background: rgba(13, 26, 15, 0.50);
}

.gameplay-thumb-overlay {
  position: absolute;
  inset: auto 0 0 0;
  height: 48%;
  background: linear-gradient(to top, rgba(5, 5, 5, 0.70) 0%, transparent 100%);
  pointer-events: none;
}

.gameplay-card-caption {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
}

.gameplay-caption-title {
  color: white;
  font-family: var(--font-display);
  font-size: 18px;
  line-height: 1.3;
}

.gameplay-caption-context {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}
```

Also remove the old `.gameplay-label`, `.gameplay-thumb span`, and `.gameplay-card figcaption` rules from `global.css` since they're replaced by the new rules above.

- [ ] **Step 4: Type check and visual verify**

```bash
npx astro check
```

In browser: gameplay clips have no number badge, structured title+context caption, gradient overlay at bottom of frame, blur-in entry animation.

- [ ] **Step 5: Commit**

```bash
git add src/consts.ts src/components/react/GameplayGridClient.tsx src/styles/global.css
git commit -m "feat: gameplay section — structured captions, blur animation, bamboo card style"
```

---

## Task 12: FinalCTA

**Files:**
- Modify: `src/components/react/FinalCTAClient.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update `.final-cta` CSS**

Replace `.final-cta`, `.final-bg`, `.final-content` rules:

```css
.final-cta {
  position: relative;
  overflow: hidden;
  padding: 80px 0;
}

.final-cta-outer {
  position: relative;
}

.final-cta-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid rgba(107, 143, 94, 0.25);
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    4px 4px 0 rgba(107, 143, 94, 0.30),
    0 40px 80px rgba(0, 0, 0, 0.6);
}

.final-cta-image {
  background-image: url("/final_cta_background 1.png");
  background-size: cover;
  background-position: center;
  min-height: 360px;
}

.final-cta-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 48px;
  background: linear-gradient(135deg, rgba(13, 26, 15, 0.98), rgba(11, 18, 16, 0.96));
}

.final-cta-content h2 {
  font-size: clamp(32px, 3.5vw, 52px);
  line-height: 1.0;
}

.final-cta-content p {
  color: var(--muted);
  font-size: 18px;
  line-height: 1.65;
  margin: 0;
}

/* Seção externa recebe o background antigo como base atmosférica */
.final-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(180deg, rgba(5, 5, 5, 0.85), rgba(5, 5, 5, 0.95)),
    url("/page_bg_raw_gpt.png");
  background-position: center;
  background-size: cover;
  filter: saturate(1.1);
}

@media (max-width: 768px) {
  .final-cta-container {
    grid-template-columns: 1fr;
  }

  .final-cta-image {
    min-height: 200px;
  }

  .final-cta-content {
    padding: 32px 24px;
  }
}
```

- [ ] **Step 2: Refactor `FinalCTAClient.tsx`**

```tsx
// src/components/react/FinalCTAClient.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PixelParticles } from "./PixelParticles";
import { FallingLeaves } from "./FallingLeaves";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const ease = [0.22, 1, 0.36, 1] as const;

interface Burst {
  id: number;
  angle: number;
  color: string;
}

function generateBurst(count = 10): Burst[] {
  const colors = ["#bfb52c", "#49c2f2", "#f8fafc", "#f21313"];
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
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);

  function handleButtonHover() {
    setBurst(generateBurst(12));
    setBurstKey((k) => k + 1);
  }

  return (
    <motion.section ref={ref} className="final-cta" style={{ position: "relative" }}>
      {/* Fundo atmosférico parallax */}
      <motion.div className="final-bg" style={{ y: bgY }} aria-hidden="true" />

      {/* Partículas de pixel sobre o fundo */}
      <PixelParticles count={20} colors={["#bfb52c", "#f8fafc", "#49c2f2"]} />

      {/* Folhas caindo */}
      <FallingLeaves mode="section" count={10} />

      <div className="container final-cta-outer" style={{ position: "relative", zIndex: 2 }}>
        <div className="final-cta-container">
          {/* Coluna esquerda — imagem */}
          <div className="final-cta-image" aria-hidden="true" />

          {/* Coluna direita — conteúdo */}
          <div className="final-cta-content">
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
              Adicione Byrd Ronin à sua lista de desejos e esteja pronto
              para runs rápidas, cortes afiados e caos crescente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.3, ease }}
              style={{ position: "relative", display: "inline-block", alignSelf: "flex-start" }}
              onHoverStart={handleButtonHover}
            >
              <SteamButtonAnimated
                label="JOGAR AGORA"
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
        </div>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 3: Type check and visual verify**

```bash
npx astro check
```

In browser: CTA shows 2-col container (image left, text+button right), leaves falling, button triggers particle burst on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/react/FinalCTAClient.tsx src/styles/global.css
git commit -m "feat: final CTA — 2-col container with image, FallingLeaves, bamboo border"
```

---

## Task 13: Footer

**Files:**
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update footer CSS**

Replace `.footer`, `.footer-grid`, and related rules:

```css
.footer {
  padding: 48px 0 0;
  border-top: 1px solid rgba(107, 143, 94, 0.20);
  background: var(--black);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 32px;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-col-title {
  color: rgba(184, 202, 219, 0.55);
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.footer-col a,
.footer-col span {
  color: var(--muted);
  font-size: 14px;
  transition: color 160ms ease;
}

.footer-col a:hover {
  color: var(--bamboo);
}

.footer-nav-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-nav-links a {
  font-family: var(--font-display);
  font-size: 15px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.footer-nav-links a:hover {
  color: var(--bamboo);
}

.footer-social {
  display: flex;
  gap: 14px;
  margin-top: 4px;
}

.footer-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(107, 143, 94, 0.25);
  border-radius: 6px;
  color: var(--muted);
  transition: border-color 160ms ease, color 160ms ease, background 160ms ease;
}

.footer-social a:hover {
  border-color: rgba(107, 143, 94, 0.6);
  color: var(--bamboo);
  background: rgba(107, 143, 94, 0.08);
}

.footer-bamboo-separator {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
  opacity: 0.14;
}

.footer-copyright {
  margin-top: 16px;
  padding: 16px 0;
  border-top: 1px solid rgba(107, 143, 94, 0.12);
  text-align: center;
  color: rgba(184, 202, 219, 0.40);
  font-size: 12px;
}
```

- [ ] **Step 2: Refactor `Footer.astro`**

```astro
---
import { STEAM_URL } from "../consts";
import { SteamButtonAnimated } from "./react/SteamButtonAnimated";
import { BambooDecor } from "./react/BambooDecor";

// Social icon SVGs (inline)
---

<footer class="footer footer-animated">
  <div class="container">
    <div class="footer-grid">

      <!-- Coluna 1: Identidade -->
      <div class="footer-col">
        <img src="/logo.png" alt="Byrd Ronin" width="140" height="79" loading="lazy" />
        <img
          src="/rdb_studio_logo.png"
          alt="RDB's Studio"
          style="height: 30px; width: auto; opacity: 0.72;"
          loading="lazy"
        />
        <span style="font-size: 13px;">Action Roguelite · Steam 2026</span>
      </div>

      <!-- Coluna 2: Site Map -->
      <div class="footer-col">
        <span class="footer-col-title">Navegar</span>
        <nav class="footer-nav-links" aria-label="Footer navigation">
          <a href="#top">Início</a>
          <a href="#trailer">Trailer</a>
          <a href="#features">Features</a>
          <a href="#gameplay">Gameplay</a>
        </nav>
      </div>

      <!-- Coluna 3: Download -->
      <div class="footer-col">
        <span class="footer-col-title">Jogar</span>
        <SteamButtonAnimated
          label="JOGAR AGORA"
          event="steam_cta_footer_click"
          client:visible
        />
        <span style="font-size: 13px;">Disponível na Steam</span>
      </div>

      <!-- Coluna 4: Studio -->
      <div class="footer-col">
        <span class="footer-col-title">RDB's Studio</span>
        <div class="footer-social">
          <!-- Twitter/X -->
          <a href="#" aria-label="Twitter/X" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <!-- Instagram -->
          <a href="#" aria-label="Instagram" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <!-- Discord -->
          <a href="#" aria-label="Discord" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.1.132 18.115a19.89 19.89 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
          <!-- YouTube -->
          <a href="#" aria-label="YouTube" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
        <a href="#" style="font-size: 13px;">rdbstudio.com ↗</a>
      </div>

    </div>

    <!-- Separador de bambu -->
    <div class="footer-bamboo-separator" aria-hidden="true">
      <BambooDecor side="left" opacity={1} style={{ transform: "rotate(90deg)", height: "48px" }} client:visible />
      <BambooDecor side="right" opacity={1} style={{ transform: "rotate(90deg) scaleX(-1)", height: "48px" }} client:visible />
    </div>

    <!-- Copyright -->
    <div class="footer-copyright">
      © 2026 Byrd Ronin · RDB's Studio
    </div>
  </div>
</footer>

<style>
  .footer-animated {
    animation: footerFade 0.6s ease both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }

  @keyframes footerFade {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @supports not (animation-timeline: view()) {
    .footer-animated { animation: none; opacity: 1; }
  }
</style>
```

- [ ] **Step 3: Type check and visual verify**

```bash
npx astro check
```

In browser: footer shows 4-col grid (2-col mobile), identity/sitemap/download/studio columns, bamboo separator, copyright row.

- [ ] **Step 4: Final build check**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.astro src/styles/global.css
git commit -m "feat: footer — 4-col grid, social icons, BambooDecor separator, copyright row"
```

---

## Spec Coverage Checklist

| Spec requirement | Task |
|-----------------|------|
| Bamboo/earth/mist palette tokens | Task 1 |
| Refined shadow offsets (4px vs 8px) | Tasks 8, 10, 11, 12 |
| SteamIcon replaces STEAM badge | Task 2 |
| BambooDecor component | Task 3 |
| FallingLeaves with prefers-reduced-motion | Task 4 |
| SectionWave dividers | Task 5 |
| Navbar: bamboo bg, BambooDecor, letter-spacing | Task 6 |
| Hero: remove logo, keyword highlights, FallingLeaves | Task 7 |
| StatusSection: overlapping badge, bamboo card | Task 8 |
| TrailerSection: 2-col grid, text column, waves | Task 9 |
| FeaturesSection: enlarged icon, alt layout, bamboo | Task 10 |
| GameplaySection: remove badge, title+context, blur anim | Task 11 |
| FinalCTA: 2-col container, image col, FallingLeaves | Task 12 |
| Footer: 4-col, identity/sitemap/download/studio | Task 13 |
