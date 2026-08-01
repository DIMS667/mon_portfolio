/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "#F6F7FB",
        "canvas-dark": "#15131C",
        paper: "#FFFFFF",
        "paper-dark": "#211F2C",
        ink: "#1D1B2E",
        "ink-light": "#F3F1F7",
        coral: "#FF6B57",
        yellow: "#FFC94A",
        mint: "#2EC4B6",
        grape: "#8C6FF7",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
        hand: ['"Caveat"', "cursive"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
