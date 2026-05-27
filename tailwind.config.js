/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      screens: {
        mobile:  { max: "640px" },
        phablet: { max: "768px" },
        tablet:  { max: "980px" },
        wide:    { min: "1200px" },
      },
      width: {
        "container-page":  "min(1160px, calc(100% - 40px))",
        "container-narrow":"min(860px, calc(100% - 40px))",
        "navbar":          "min(1180px, calc(100% - 28px))",
        "cta-section":     "min(1200px, calc(100% - 48px))",
        "cta-col":         "48%",
      },
      maxWidth: {
        "container-page": "min(1160px, calc(100% - 40px))",
      },
      fontSize: {
        "3xs":         ["0.5625rem",                { lineHeight: "0.875rem" }],
        "2xs":         ["0.625rem",                 { lineHeight: "1rem" }],
        "hero":        ["clamp(54px,7vw,96px)",     { lineHeight: "0.88" }],
        "hero-mobile": ["clamp(46px,18vw,68px)",    { lineHeight: "0.88" }],
        "section-xl":  ["clamp(2.8rem,5vw,4.5rem)", { lineHeight: "0.88" }],
        "section-md":  ["clamp(1.8rem,3vw,2.8rem)", { lineHeight: "1.15" }],
        "quote":       ["clamp(1.6rem,4vw,3rem)",   { lineHeight: "1.15" }],
        "deco-kanji":  ["clamp(3rem,4.5vw,5rem)",   { lineHeight: "1" }],
        "deco-quote":  ["clamp(5rem,14vw,9rem)",    { lineHeight: "1" }],
        "display-404": ["clamp(96px,20vw,200px)",   { lineHeight: "1" }],
      },
      letterSpacing: {
        "ui-tight":   "0.06em",
        "ui-label":   "0.18em",
        "ui-hint":    "0.2em",
        "ui-caption": "0.22em",
        "ui-hud":     "0.28em",
        "ui-wide":    "0.3em",
        "ui-hero":    "0.4em",
      },
      lineHeight: {
        tighter: "0.88",
      },
      colors: {
        red:          "#f21313",
        black:        "#050505",
        panel:        "#18181b",
        "blue-light": "#49c2f2",
        white:        "#f8fafc",
        muted:        "#b8cadb",
        bamboo:       "#6b8f5e",
        scarlet:      "#ff3b2e",
        forest:       "#0d1a0f",
      },
      fontFamily: {
        display: ['"Pixelify Sans"', "system-ui", "sans-serif"],
        body:    ['"Inter"', "system-ui", "sans-serif"],
      },
      gridTemplateColumns: {
        "navbar":        "auto 1fr auto",
        "trailer":       "4fr 7fr",
        "gameplay-even": "3fr 5fr",
        "gameplay-odd":  "5fr 3fr",
      },
      zIndex: {
        menu: "39",
      },
      boxShadow: {
        "video":     "4px 4px 0 rgba(191,181,44,0.25), 0 32px 80px rgba(0,0,0,0.48)",
        "steam-btn": "0 8px 0 #870707, 0 18px 36px rgba(242,19,19,0.32)",
      },
      dropShadow: {
        character: "0 36px 48px rgba(0,0,0,0.5)",
      },
    },
  },
};
