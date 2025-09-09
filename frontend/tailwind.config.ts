// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan React/TypeScript files
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E40AF", // primary brand color
          light: "#60A5FA",
          dark: "#1E3A8A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class", // enables manual dark mode with `class="dark"`
  plugins: [],
};

export default config;
