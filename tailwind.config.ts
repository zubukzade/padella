import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        // Brand palette
        forest: {
          DEFAULT: "#0F3D2E",
          50: "#E8F1ED",
          100: "#C9E0D7",
          200: "#8FBFAD",
          300: "#5C9C84",
          400: "#2F6F58",
          500: "#0F3D2E",
          600: "#0C3325",
          700: "#09271D",
          800: "#061B14",
          900: "#03100C",
        },
        sand: {
          DEFAULT: "#F6F2EA",
          dark: "#E7E0D2",
        },
        ink: "#050505",
        neon: {
          DEFAULT: "#C9FF3D",
          soft: "#D9FF73",
          dark: "#A6E000",
        },
        gold: {
          DEFAULT: "#E8C879",
          light: "#F5DFA6",
          deep: "#B8923D",
        },
        // shadcn-style semantic tokens
        border: "rgba(255,255,255,0.10)",
        input: "rgba(255,255,255,0.12)",
        ring: "#C9FF3D",
        background: "#050505",
        foreground: "#F6F2EA",
        primary: { DEFAULT: "#C9FF3D", foreground: "#06120B" },
        secondary: { DEFAULT: "#0F3D2E", foreground: "#F6F2EA" },
        muted: { DEFAULT: "rgba(255,255,255,0.06)", foreground: "rgba(246,242,234,0.62)" },
        accent: { DEFAULT: "#0F3D2E", foreground: "#F6F2EA" },
        card: { DEFAULT: "rgba(255,255,255,0.04)", foreground: "#F6F2EA" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
      },
      backgroundImage: {
        "neon-radial":
          "radial-gradient(60% 60% at 50% 40%, rgba(201,255,61,0.18) 0%, rgba(201,255,61,0) 70%)",
        "forest-fade":
          "linear-gradient(180deg, rgba(15,61,46,0.0) 0%, rgba(15,61,46,0.35) 60%, rgba(5,5,5,1) 100%)",
        "grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(201,255,61,0.35), 0 0 40px -8px rgba(201,255,61,0.55)",
        "glow-sm": "0 0 24px -8px rgba(201,255,61,0.5)",
        glass: "0 8px 40px -12px rgba(0,0,0,0.55), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        gold: "0 0 0 1px rgba(232,200,121,0.4), 0 0 50px -10px rgba(232,200,121,0.5)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
