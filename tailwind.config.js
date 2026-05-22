/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        black:        "#050505",
        ink:          "#0b1220",
        panel:        "#18181b",
        "blue-deep":  "#0367a6",
        blue:         "#0788d9",
        "blue-light": "#49c2f2",
        gold:         "#bfb52c",
        red:          "#f21313",
        white:        "#f8fafc",
        muted:        "#b8cadb",
        bamboo:       "#6b8f5e",
        earth:        "#8b6f47",
        mist:         "rgba(180,210,180,0.08)",
      },
      fontFamily: {
        display: ['"Pixelify Sans"', "system-ui", "sans-serif"],
        body:    ['"Inter"',          "system-ui", "sans-serif"],
      },
    },
  },
};
