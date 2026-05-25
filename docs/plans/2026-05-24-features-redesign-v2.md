# Features Section — Placa Pendurada Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar os cards de features como placas de madeira penduradas com ícones pixel art temáticos (katana, máscara oni, shurikens), animação de swing no hover, hastes de bambu que sobem nas laterais e shuriken giratório no canto.

**Architecture:** Dois arquivos: `FeatureIcons.tsx` exporta todos os SVGs (ícones principais + decorativos + bambu), `FeatureGrid.tsx` importa e monta os cards. Os três estados framer-motion `hidden/visible/hover` são propagados do card pai para todos os filhos animados via variant names. Sem clip-path, sem CRT filter, sem imagens de gameplay.

**Tech Stack:** React, framer-motion, Tailwind CSS (apenas para grid/breakpoint), inline styles para wood texture e cores dinâmicas.

---

## File Map

| File | Ação |
|------|------|
| `src/components/react/FeatureIcons.tsx` | Criar (foi deletado na v1 — recriar com novos ícones) |
| `src/components/react/FeatureGrid.tsx` | Rewrite completo |

---

### Task 1: Criar FeatureIcons.tsx com todos os SVGs pixel art

**Files:**
- Create: `src/components/react/FeatureIcons.tsx`

- [ ] **Step 1: Criar o arquivo com todos os ícones**

Criar `src/components/react/FeatureIcons.tsx` com o conteúdo completo abaixo:

```tsx
// width/height removidos — preenchidos pelo container via style={{ width, height }}
// fill="currentColor" herda a cor do wrapper (accentColor por card)

export function KatanaIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      {/* Blade */}
      <rect x="24" y="2" width="5" height="2" fill="currentColor" />
      <rect x="22" y="4" width="4" height="2" fill="currentColor" />
      <rect x="20" y="6" width="4" height="2" fill="currentColor" />
      <rect x="18" y="8" width="4" height="2" fill="currentColor" />
      <rect x="16" y="10" width="4" height="2" fill="currentColor" />
      {/* Blade shine */}
      <rect x="25" y="2" width="2" height="1" fill="currentColor" opacity="0.35" />
      <rect x="23" y="4" width="2" height="1" fill="currentColor" opacity="0.35" />
      <rect x="21" y="6" width="2" height="1" fill="currentColor" opacity="0.35" />
      <rect x="19" y="8" width="2" height="1" fill="currentColor" opacity="0.35" />
      {/* Tsuba (guard) */}
      <rect x="10" y="11" width="10" height="4" fill="currentColor" />
      <rect x="13" y="9" width="4" height="8" fill="currentColor" opacity="0.6" />
      {/* Handle */}
      <rect x="11" y="15" width="3" height="3" fill="currentColor" opacity="0.85" />
      <rect x="9" y="17" width="3" height="3" fill="currentColor" opacity="0.85" />
      <rect x="7" y="19" width="3" height="3" fill="currentColor" opacity="0.85" />
      <rect x="5" y="21" width="3" height="3" fill="currentColor" opacity="0.85" />
      <rect x="3" y="23" width="4" height="3" fill="currentColor" opacity="0.85" />
      {/* Handle wrap marks (tsuka-ito) */}
      <rect x="10" y="16" width="2" height="1" fill="currentColor" opacity="0.35" />
      <rect x="8" y="18" width="2" height="1" fill="currentColor" opacity="0.35" />
      <rect x="6" y="20" width="2" height="1" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function OniMaskIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      {/* Horns */}
      <rect x="8" y="0" width="4" height="7" fill="currentColor" />
      <rect x="20" y="0" width="4" height="7" fill="currentColor" />
      <rect x="9" y="5" width="3" height="4" fill="currentColor" opacity="0.7" />
      <rect x="20" y="5" width="3" height="4" fill="currentColor" opacity="0.7" />
      {/* Face ambient */}
      <rect x="6" y="6" width="20" height="20" fill="currentColor" opacity="0.1" />
      <rect x="4" y="9" width="24" height="14" fill="currentColor" opacity="0.06" />
      {/* Eyes */}
      <rect x="7" y="10" width="7" height="5" fill="currentColor" />
      <rect x="18" y="10" width="7" height="5" fill="currentColor" />
      {/* Eye glow center */}
      <rect x="9" y="11" width="3" height="3" fill="currentColor" opacity="0.4" />
      <rect x="20" y="11" width="3" height="3" fill="currentColor" opacity="0.4" />
      {/* Brow furrow */}
      <rect x="8" y="9" width="5" height="2" fill="currentColor" opacity="0.6" />
      <rect x="19" y="9" width="5" height="2" fill="currentColor" opacity="0.6" />
      {/* Nose */}
      <rect x="14" y="15" width="2" height="4" fill="currentColor" opacity="0.5" />
      <rect x="16" y="15" width="2" height="4" fill="currentColor" opacity="0.5" />
      <rect x="13" y="17" width="6" height="2" fill="currentColor" opacity="0.5" />
      {/* Mouth line */}
      <rect x="7" y="21" width="18" height="2" fill="currentColor" opacity="0.7" />
      {/* Fangs */}
      <rect x="10" y="23" width="3" height="5" fill="currentColor" />
      <rect x="19" y="23" width="3" height="5" fill="currentColor" />
      <rect x="15" y="23" width="2" height="3" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function ShurikenChaosIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      {/* Large center shuriken — cross */}
      <rect x="14" y="8" width="4" height="16" fill="currentColor" />
      <rect x="8" y="14" width="16" height="4" fill="currentColor" />
      {/* Diagonal blades */}
      <rect x="11" y="11" width="4" height="4" fill="currentColor" opacity="0.85" />
      <rect x="17" y="11" width="4" height="4" fill="currentColor" opacity="0.85" />
      <rect x="11" y="17" width="4" height="4" fill="currentColor" opacity="0.85" />
      <rect x="17" y="17" width="4" height="4" fill="currentColor" opacity="0.85" />
      {/* Center rivet */}
      <rect x="15" y="15" width="2" height="2" fill="currentColor" opacity="0.2" />
      {/* Small shuriken — top-left */}
      <rect x="1" y="3" width="2" height="6" fill="currentColor" opacity="0.65" />
      <rect x="0" y="5" width="6" height="2" fill="currentColor" opacity="0.65" />
      <rect x="2" y="4" width="2" height="2" fill="currentColor" opacity="0.4" />
      {/* Small shuriken — bottom-right */}
      <rect x="29" y="23" width="2" height="6" fill="currentColor" opacity="0.65" />
      <rect x="26" y="25" width="6" height="2" fill="currentColor" opacity="0.65" />
      <rect x="28" y="24" width="2" height="2" fill="currentColor" opacity="0.4" />
      {/* Motion lines */}
      <rect x="3" y="13" width="5" height="1" fill="currentColor" opacity="0.35" />
      <rect x="24" y="13" width="5" height="1" fill="currentColor" opacity="0.35" />
      <rect x="3" y="18" width="4" height="1" fill="currentColor" opacity="0.25" />
      <rect x="25" y="18" width="4" height="1" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

// Decorative shuriken for card corner (smaller, used with accentColor)
export function ShurikenSmallIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      <rect x="7" y="2" width="2" height="12" fill="currentColor" />
      <rect x="2" y="7" width="12" height="2" fill="currentColor" />
      <rect x="5" y="5" width="2" height="2" fill="currentColor" opacity="0.8" />
      <rect x="9" y="5" width="2" height="2" fill="currentColor" opacity="0.8" />
      <rect x="5" y="9" width="2" height="2" fill="currentColor" opacity="0.8" />
      <rect x="9" y="9" width="2" height="2" fill="currentColor" opacity="0.8" />
      <rect x="7" y="7" width="2" height="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

// Bamboo stalk decoration — fixed green colors (not accentColor)
export function BambooStalk() {
  return (
    <svg viewBox="0 0 12 64" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      {/* Segment 1 */}
      <rect x="3" y="0" width="6" height="13" fill="#4a7c3f" />
      <rect x="4" y="1" width="2" height="11" fill="#5d9950" opacity="0.4" />
      {/* Node 1 */}
      <rect x="1" y="13" width="10" height="3" fill="#2d4d27" />
      {/* Segment 2 */}
      <rect x="3" y="16" width="6" height="13" fill="#3d6633" />
      <rect x="4" y="17" width="2" height="11" fill="#4a7c3f" opacity="0.4" />
      {/* Node 2 */}
      <rect x="1" y="29" width="10" height="3" fill="#2d4d27" />
      {/* Segment 3 */}
      <rect x="3" y="32" width="6" height="13" fill="#4a7c3f" />
      <rect x="4" y="33" width="2" height="11" fill="#5d9950" opacity="0.4" />
      {/* Node 3 */}
      <rect x="1" y="45" width="10" height="3" fill="#2d4d27" />
      {/* Segment 4 */}
      <rect x="3" y="48" width="6" height="12" fill="#3d6633" />
      <rect x="4" y="49" width="2" height="10" fill="#4a7c3f" opacity="0.4" />
      {/* Tip */}
      <rect x="4" y="60" width="4" height="4" fill="#3d6633" />
      <rect x="5" y="61" width="2" height="3" fill="#4a7c3f" opacity="0.5" />
    </svg>
  );
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit 2>&1
```

Expected: sem output (zero erros).

- [ ] **Step 3: Commit**

```bash
git add src/components/react/FeatureIcons.tsx
git commit -m "feat: create FeatureIcons with katana, oni mask, shuriken, bamboo pixel art"
```

---

### Task 2: Rewrite FeatureGrid.tsx — Placa Pendurada

**Files:**
- Modify: `src/components/react/FeatureGrid.tsx`

> **Design notes:**
> - `motion.article` é o card completo: tem a textura de madeira, swing no hover e a animação de entrada. `overflow: hidden` é necessário para o bambu aparecer deslizando de baixo.
> - Os furos (`HoleDecor`) ficam dentro do card no `top: 4` — não fora, pois `overflow: hidden` cortaria.
> - Variant propagation do framer-motion: quando `motion.article` entra em `"hover"`, todos os filhos `motion.div` que definem `hover` no seu `variants` são animados automaticamente. Por isso todos os filhos (`shurikenDecorVariants`, `bambooVariants`, `iconVariants`) precisam dos três estados: `hidden`, `visible`, `hover`.
> - `bambooVariants.visible = { opacity: 0, y: 16 }` — o bambu fica INVISÍVEL em repouso, só aparece no hover.
> - `makeCardVariants` é uma função (não um objeto) porque `featured` muda o `y` de entrada.
> - `rotate: [-1.5, 1, -0.4, 0]` é um keyframe array — framer-motion anima entre esses valores em sequência, criando o efeito de balanço que amorece.

- [ ] **Step 1: Reescrever FeatureGrid.tsx completo**

Substituir todo o conteúdo de `src/components/react/FeatureGrid.tsx`:

```tsx
import { motion } from "framer-motion";
import { KatanaIcon, OniMaskIcon, ShurikenChaosIcon, ShurikenSmallIcon, BambooStalk } from "./FeatureIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
    accentColor: "#bfb52c",
    Icon: KatanaIcon,
    featured: false,
  },
  {
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
    accentColor: "#49c2f2",
    Icon: OniMaskIcon,
    featured: true,
  },
  {
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
    accentColor: "#f21313",
    Icon: ShurikenChaosIcon,
    featured: false,
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

// Bambu: invisível em repouso, aparece no hover
const bambooVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 0, y: 16 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

// Shuriken decorativo: estático em repouso, gira no hover
const shurikenDecorVariants = {
  hidden: { rotate: 0, opacity: 0.4 },
  visible: { rotate: 0, opacity: 0.4 },
  hover: { rotate: 360, opacity: 0.85, transition: { duration: 0.6, ease: "linear" as const } },
};

// Ícone principal: escala levemente no hover
const iconVariants = {
  hidden: { scale: 1 },
  visible: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { type: "spring" as const, stiffness: 300, damping: 15 },
  },
};

// Card: animação de entrada diferente para featured, swing no hover
function makeCardVariants(featured: boolean) {
  return {
    hidden: { opacity: 0, y: featured ? 20 : 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
    hover: {
      rotate: [-1.5, 1, -0.4, 0] as number[],
      transition: { type: "spring" as const, stiffness: 280, damping: 12 },
    },
  };
}

const WOOD_BG =
  "repeating-linear-gradient(168deg, #5c3d1e 0px, #6b4826 2px, #7a5530 4px, #5c3d1e 7px, #6b4826 9px, #5c3d1e 12px)";

function HoleDecor({ featured }: { featured: boolean }) {
  const size = featured ? 10 : 8;
  const gap = featured ? 56 : 40;
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 4,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap,
        pointerEvents: "none",
      }}
    >
      {([0, 1] as const).map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 8 8"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          <rect x="2" y="0" width="4" height="8" fill="#1a0d00" />
          <rect x="0" y="2" width="8" height="4" fill="#1a0d00" />
          <rect x="1" y="1" width="6" height="6" fill="#1a0d00" />
          <rect x="2" y="2" width="4" height="4" fill="#0d0600" />
          <rect x="3" y="1" width="2" height="1" fill="#3d2509" opacity="0.5" />
        </svg>
      ))}
    </div>
  );
}

function FeatureCard({
  title,
  text,
  accentColor,
  Icon,
  featured,
}: {
  title: string;
  text: string;
  accentColor: string;
  Icon: () => JSX.Element;
  featured: boolean;
}) {
  return (
    <motion.article
      className="max-[980px]:h-auto!"
      style={{
        background: WOOD_BG,
        border: "2px solid #3d2509",
        boxShadow: featured
          ? "2px 4px 0 #2a1a05, 0 12px 40px rgba(0,0,0,0.6)"
          : "2px 4px 0 #2a1a05, 0 8px 24px rgba(0,0,0,0.5)",
        borderRadius: 4,
        height: featured ? 480 : 380,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "40px 20px 24px",
      }}
      variants={makeCardVariants(featured)}
      whileHover="hover"
    >
      <HoleDecor featured={featured} />

      {/* Shuriken decorativo — canto superior direito */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 20,
          height: 20,
          color: accentColor,
        }}
        variants={shurikenDecorVariants}
      >
        <ShurikenSmallIcon />
      </motion.div>

      {/* Ícone principal */}
      <motion.div
        style={{
          width: 96,
          height: 96,
          color: accentColor,
          flexShrink: 0,
        }}
        variants={iconVariants}
      >
        <Icon />
      </motion.div>

      {/* Separador */}
      <div
        aria-hidden="true"
        style={{
          width: "calc(100% + 40px)",
          height: 1,
          background: "rgba(255,255,255,0.08)",
          margin: "16px -20px",
          flexShrink: 0,
        }}
      />

      {/* Texto */}
      <div style={{ textAlign: "center", padding: "0 4px" }}>
        <h3
          style={{
            fontFamily: '"Pixelify Sans", system-ui, sans-serif',
            fontSize: "1.5rem",
            color: "#f8fafc",
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "#b8cadb",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>

      {/* Hastes de bambu — aparecem no hover */}
      <motion.div
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 8, width: 12, height: 64 }}
        variants={bambooVariants}
      >
        <BambooStalk />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, right: 8, width: 12, height: 64 }}
        variants={bambooVariants}
      >
        <BambooStalk />
      </motion.div>
    </motion.article>
  );
}

export function FeatureGrid() {
  return (
    <motion.div
      className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-6 items-end"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {features.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit 2>&1
```

Expected: sem output (zero erros).

- [ ] **Step 3: Commit**

```bash
git add src/components/react/FeatureGrid.tsx
git commit -m "feat: redesign features as hanging wood signs with pixel art icons and swing animation"
```

---

### Task 3: Verificação Visual

**Files:** nenhum (verificação only)

- [ ] **Step 1: Iniciar dev server**

```bash
pnpm dev
```

Expected: servidor em `http://127.0.0.1:4321` (porta pode variar — ver output).

- [ ] **Step 2: Abrir e verificar no browser**

Navegar para `http://127.0.0.1:<porta>` e scrollar até a seção Features.

**Checklist desktop:**
- [ ] Textura de madeira visível nos 3 cards (veios diagonais marrom)
- [ ] Dois furos escuros no topo de cada card
- [ ] Shuriken pequeno visível no canto superior-direito de cada card
- [ ] Ícone pixel art centralizado com cor temática (dourado/azul/vermelho)
- [ ] Separador horizontal entre ícone e texto
- [ ] Título aparece UMA ÚNICA vez (h3), sem badge duplicado
- [ ] Card central (Inimigos) visivelmente mais alto
- [ ] Ao hover: card balança (swing suave), shuriken gira, hastes de bambu sobem pelas laterais
- [ ] Sombreado de espessura (box-shadow 2×4px sólido) visível na base do card

**Checklist mobile (viewport < 980px):**
- [ ] Grid colapsa para coluna única
- [ ] Cards com `height: auto` (não fixo)

- [ ] **Step 3: Se algum item falhar, corrigir antes de continuar**

Problemas comuns:
- `JSX.Element` type error: substituir `() => JSX.Element` por `React.ComponentType` e adicionar `import type { ComponentType } from "react"`
- Bambu não aparece no hover: verificar que `bambooVariants` está sendo passado como `variants` nos dois `motion.div` de bambu
- Swing não funciona: verificar que `motion.article` tem `whileHover="hover"` e que `makeCardVariants` retorna o estado `hover` com o array `rotate`
