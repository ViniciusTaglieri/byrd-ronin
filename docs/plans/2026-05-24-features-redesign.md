# Features Section Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain SVG-icon feature cards with image-backed cards featuring diagonal clip-path corners, scan lines + noise overlay on the image, per-card thematic accent colors, and a taller featured center card.

**Architecture:** Single file rewrite of `FeatureGrid.tsx`. Each card is a `motion.div` wrapper (handles enter animation + hover translate + drop-shadow glow) containing a static `div` with `clip-path` and the card content. The 1px wrapper padding + matching clip-path on the inner div creates a colored "border" that follows the diagonal cut. A single hidden SVG `<defs>` block at component root defines the noise filter used by all three cards.

**Tech Stack:** React, framer-motion, Tailwind CSS, inline styles for clip-path and dynamic accent colors.

---

## File Map

| File | Action |
|------|--------|
| `src/components/react/FeatureIcons.tsx` | Delete |
| `src/components/react/FeatureGrid.tsx` | Full rewrite |

---

### Task 1: Delete FeatureIcons.tsx

**Files:**
- Delete: `src/components/react/FeatureIcons.tsx`

- [ ] **Step 1: Delete the file**

```bash
rm src/components/react/FeatureIcons.tsx
```

- [ ] **Step 2: Verify it's gone**

```bash
ls src/components/react/FeatureIcons.tsx 2>&1
```

Expected: `ls: cannot access 'src/components/react/FeatureIcons.tsx': No such file or directory`

- [ ] **Step 3: Commit**

```bash
git add -A src/components/react/FeatureIcons.tsx
git commit -m "remove: delete FeatureIcons.tsx — replaced by image assets"
```

---

### Task 2: Rewrite FeatureGrid.tsx

**Files:**
- Modify: `src/components/react/FeatureGrid.tsx`

> **Design notes:**
> - `motion.div` wrapper handles `y` translate (enter + hover) and `filter: drop-shadow` glow. Clip-path is also on the wrapper so the glow follows the diagonal shape.
> - Inner `div` has the same `clip-path` plus `padding: 1px` gap from the wrapper, creating a ~1px accent-color border on all edges including the diagonal.
> - `imageVariants` defines `hidden/visible/hover` so framer-motion variant propagation drives the brightness transition automatically when the wrapper enters `hover`.
> - The `#noise-filter` SVG is declared once in a hidden `<svg>` at the component root; all three card overlays reference it by id.
> - Mobile override `max-[980px]:!h-auto` uses Tailwind's `!important` modifier to override the inline `height` on screens narrower than 980px.

- [ ] **Step 1: Write the new FeatureGrid.tsx**

Replace the entire contents of `src/components/react/FeatureGrid.tsx` with:

```tsx
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
    image: "/features_upgrades.png",
    accentColor: "#bfb52c",
    featured: false,
  },
  {
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
    image: "/features_inimigos.png",
    accentColor: "#49c2f2",
    featured: true,
  },
  {
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
    image: "/features_caos.png",
    accentColor: "#f21313",
    featured: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

function getClipPath(featured: boolean) {
  const cut = featured ? 28 : 20;
  return `polygon(0 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% 100%, 0 100%)`;
}

function makeWrapperVariants(featured: boolean, accentColor: string) {
  return {
    hidden: { opacity: 0, y: featured ? 28 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
      transition: { duration: 0.55, ease },
    },
    hover: {
      y: -6,
      filter: `drop-shadow(0 0 10px ${accentColor}99) drop-shadow(0 16px 40px rgba(0,0,0,0.5))`,
      transition: { duration: 0.25 },
    },
  };
}

const imageVariants = {
  hidden: { filter: "brightness(0.8)" },
  visible: { filter: "brightness(0.8)" },
  hover: { filter: "brightness(1.05)", transition: { duration: 0.3 } },
};

function FeatureCard({
  title,
  text,
  image,
  accentColor,
  featured,
}: {
  title: string;
  text: string;
  image: string;
  accentColor: string;
  featured: boolean;
}) {
  const clipPath = getClipPath(featured);

  return (
    <motion.div
      style={{
        clipPath,
        padding: "1px",
        background: `${accentColor}33`,
      }}
      variants={makeWrapperVariants(featured, accentColor)}
      whileHover="hover"
    >
      <div
        className="max-[980px]:!h-auto"
        style={{
          clipPath,
          height: featured ? 520 : 420,
          background: "#18181b",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Image area */}
        <div style={{ position: "relative", flex: "0 0 55%" }}>
          <motion.img
            src={image}
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            variants={imageVariants}
          />
          {/* Scan lines */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
              pointerEvents: "none",
            }}
          />
          {/* Noise */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              filter: "url(#noise-filter)",
              opacity: 0.06,
              pointerEvents: "none",
            }}
          />
          {/* Badge */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              background: accentColor,
              color: "#050505",
              fontFamily: '"Pixelify Sans", system-ui, sans-serif',
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 8px",
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>
        </div>

        {/* Separator */}
        <div
          aria-hidden="true"
          style={{ height: 1, background: `${accentColor}4d`, flexShrink: 0 }}
        />

        {/* Text */}
        <div
          style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flex: 1,
          }}
        >
          <h3
            style={{
              fontFamily: '"Pixelify Sans", system-ui, sans-serif',
              fontSize: "1.5rem",
              color: "#f8fafc",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              color: "#b8cadb",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FeatureGrid() {
  return (
    <>
      <svg style={{ display: "none" }} aria-hidden="true">
        <defs>
          <filter id="noise-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" />
          </filter>
        </defs>
      </svg>
      <motion.div
        className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-6 items-center"
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

- [ ] **Step 2: Verify TypeScript compiles without errors**

```bash
cd /home/vini/Desenvolvimento/Projetos/birdyronin-claude/ByrdRoninWebsite && npx tsc --noEmit 2>&1
```

Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
git add src/components/react/FeatureGrid.tsx
git commit -m "feat: redesign features cards with images, scan lines, clip-path, thematic accent colors"
```

---

### Task 3: Visual Verification

**Files:** none (read-only verification)

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

Expected: server starts at `http://127.0.0.1:4321` (or similar port shown in output).

- [ ] **Step 2: Open the site and navigate to the Features section**

Open `http://127.0.0.1:4321` in a browser. Scroll to the Features section.

**Checklist — verify all of the following:**

- [ ] Three cards visible, center card (Inimigos) noticeably taller than side cards
- [ ] Each card shows its game image in the top ~55% of the card
- [ ] Scan lines visible over each image (horizontal stripe pattern, subtle)
- [ ] Badge label (text matching card title) appears bottom-left of each image
- [ ] Separator line visible between image area and text area
- [ ] Title + body text visible in text area below separator
- [ ] Diagonal corner cut visible on top-right of each card
- [ ] On hover: card translates up ~6px, colored glow appears, image brightens slightly
- [ ] On mobile viewport (< 980px): cards stack vertically, heights are `auto` (not fixed)

- [ ] **Step 3: If any issue is found, fix and re-verify before continuing**

Common fixes:
- Image not showing: check that `/features_upgrades.png`, `/features_inimigos.png`, `/features_caos.png` exist in `public/`
- Noise filter not applying: browser may block SVG filters from hidden `<svg>` — verify `id="noise-filter"` matches the `url(#noise-filter)` reference
- Mobile height not overriding: confirm `max-[980px]:!h-auto` class is recognized by Tailwind (check that the Tailwind content glob covers `src/components/react/**/*.tsx`)
