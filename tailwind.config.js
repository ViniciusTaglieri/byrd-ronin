/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      width: {
        "container-page": "min(1160px, calc(100% - 40px))",
        "container-narrow": "min(860px, calc(100% - 40px))",
      },
      maxWidth: {
        "container-page": "min(1160px, calc(100% - 40px))",
      },
      fontSize: {
        "3xs": ["0.5625rem", { lineHeight: "0.875rem" }], // 9px
        "2xs": ["0.625rem", { lineHeight: "1rem" }],      // 10px
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
        red: "#f21313",
        black: "#050505",
        panel: "#18181b",
        "blue-light": "#49c2f2",
        white: "#f8fafc",
        muted: "#b8cadb",
        bamboo: "#6b8f5e",
        scarlet: "#ff3b2e",
        forest: "#0d1a0f",
      },
      fontFamily: {
        display: ['"Pixelify Sans"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
};
