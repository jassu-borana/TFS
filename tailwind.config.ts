import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        "brand-dark": "#0a0a0a",
        "brand-cream": "#FBF6F6",
        "brand-accent": "#e8c97e",
      },
      backgroundImage: {
        "cinematic-gradient":
          "radial-gradient(ellipse at 50% 0%, rgba(232,201,126,0.08) 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #111111 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
