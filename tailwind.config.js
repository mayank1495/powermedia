/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,html}", "./resources/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Column.com palette — paper canvas, deep-ink type, ember accent.
        paper: "#f6f6f8",
        bg: "#f6f6f8",
        card: "#ffffff",
        surface: { DEFAULT: "#ffffff", raised: "#ffffff" },
        ink: { DEFAULT: "#011821", carbon: "#12161e", muted: "#7c7f88" },
        slate: "#7c7f88",
        mist: "#e3e4e8",
        fog: "#a9acb6",
        graphite: "#3b3e47",
        indigo: { DEFAULT: "#111a4a", 700: "#0c1438" },
        ember: "#ec652b",
        // legacy names kept working: brand=ember accent, brand-ink=indigo (readable), brand-soft=cyan
        brand: { DEFAULT: "#ec652b", ink: "#111a4a", soft: "#c1e8ef" },
        teal: { DEFAULT: "#167e6c", deep: "#023247" },
        cyan: "#c1e8ef",
        sky: "#7ea7e9",
        mint: "#44b48b",
        lavender: "#9f7aee",
        night: { DEFAULT: "#011821", soft: "#12161e", line: "#3b3e47" },
      },
      spacing: {
        13: "3.25rem",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
      },
      maxWidth: {
        content: "75rem",
        prose: "65ch",
      },
      boxShadow: {
        subtle:
          "rgba(17, 26, 74, 0.1) 0 1px 3px 0, rgba(17, 26, 74, 0.05) 0 1px 0 0",
        card: "var(--shadow-card)",
        float: "var(--shadow-float)",
        lift: "var(--shadow-float)",
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
