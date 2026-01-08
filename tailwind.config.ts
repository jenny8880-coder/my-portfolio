import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        akshar: ["var(--font-akshar)", "sans-serif"],
      },
      colors: {
        background: "var(--background-primary)",
        text: "var(--text-primary)",
        accent: "var(--accent-main)",
      },
      animation: {
        "fade-in-slow": "fade-in var(--motion-duration-slow, 450ms) ease-out",
        "fade-in-fast": "fade-in var(--motion-duration-fast, 180ms) ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;



