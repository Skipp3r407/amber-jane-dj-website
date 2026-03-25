import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#080808",
        ink: "#0c0c0e",
        midnight: "#1A1033",
        foreground: "#F8F8F8",
        muted: "#A0A0A0",
        neon: {
          pink: "#FF3CAC",
          purple: "#7B2CFF",
          blue: "#00C2FF",
        },
        violet: {
          soft: "#B388FF",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "system-ui", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon:
          "0 0 24px rgba(255, 60, 172, 0.35), 0 0 48px rgba(123, 44, 255, 0.18)",
        "neon-sm": "0 0 14px rgba(0, 194, 255, 0.35)",
        "cta-pulse":
          "0 0 0 0 rgba(255, 60, 172, 0.35), 0 0 24px rgba(123, 44, 255, 0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(8,8,8,0.94), rgba(8,8,8,0.98)), radial-gradient(ellipse 80% 50% at 50% -20%, rgba(123, 44, 255, 0.22), transparent)",
        "hero-glow":
          "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(255, 60, 172, 0.14), transparent 55%), radial-gradient(ellipse 80% 60% at 85% 15%, rgba(0, 194, 255, 0.1), transparent 50%), radial-gradient(ellipse 70% 50% at 10% 40%, rgba(26, 16, 51, 0.5), transparent 55%)",
        "text-shine":
          "linear-gradient(90deg, #FF3CAC 0%, #7B2CFF 40%, #00C2FF 70%, #FF3CAC 100%)",
      },
      animation: {
        "gradient-shift": "gradient-shift 16s ease infinite",
        float: "float 6s ease-in-out infinite",
        "cta-glow": "cta-glow 3.5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "cta-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 60, 172, 0.25)" },
          "50%": { boxShadow: "0 0 28px 4px rgba(123, 44, 255, 0.35)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
