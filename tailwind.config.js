/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,html}", "./resources/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Committed orange identity — channel triplets in CSS vars (see src/input.css)
        brand: {
          DEFAULT: "oklch(var(--c-brand) / <alpha-value>)",
          ink: "oklch(var(--c-brand-ink) / <alpha-value>)",
          soft: "oklch(var(--c-brand-soft) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "oklch(var(--c-ink) / <alpha-value>)",
          muted: "oklch(var(--c-muted) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "oklch(var(--c-surface) / <alpha-value>)",
          raised: "oklch(var(--c-surface) / <alpha-value>)",
        },
        night: {
          DEFAULT: "oklch(var(--c-night) / <alpha-value>)",
          soft: "oklch(var(--c-night-soft) / <alpha-value>)",
          line: "oklch(var(--c-night-line) / <alpha-value>)",
        },
      },
      fontWeight: {
        800: "800",
        900: "900",
      },
      spacing: {
        13: "3.25rem",
      },
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        sans: ["'Hanken Grotesk'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        content: "75rem",
        prose: "65ch",
      },
      boxShadow: {
        lift: "0 12px 34px -18px rgb(0 0 0 / 0.22)",
        glow: "0 12px 32px -16px var(--c-brand-glow)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        dash: {
          to: { "stroke-dashoffset": "0" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
