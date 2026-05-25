/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      width: {
        "container-page": "min(1160px, calc(100% - 40px))",
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
