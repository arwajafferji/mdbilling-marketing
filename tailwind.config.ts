import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#F0F4F9",
          100: "#D9E2EC",
          200: "#B3C5DA",
          300: "#829AB1",
          400: "#486581",
          500: "#334E68",
          600: "#243B53",
          700: "#102A43",
          800: "#0A2540",
          900: "#061A30",
        },
        crimson: {
          DEFAULT: "#C91F1F",
          hover:   "#A81818",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "screen-xl": "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
