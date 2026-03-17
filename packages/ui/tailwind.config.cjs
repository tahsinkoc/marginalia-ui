/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--ulib-color-canvas) / <alpha-value>)",
        surface: "rgb(var(--ulib-color-surface) / <alpha-value>)",
        surfaceAlt: "rgb(var(--ulib-color-surface-alt) / <alpha-value>)",
        border: "rgb(var(--ulib-color-border) / <alpha-value>)",
        text: "rgb(var(--ulib-color-text) / <alpha-value>)",
        textMuted: "rgb(var(--ulib-color-text-muted) / <alpha-value>)",
        accent: "rgb(var(--ulib-color-accent) / <alpha-value>)",
        accentSoft: "rgb(var(--ulib-color-accent-soft) / <alpha-value>)",
        focus: "rgb(var(--ulib-color-focus) / <alpha-value>)",
        success: "rgb(var(--ulib-color-success) / <alpha-value>)",
        warning: "rgb(var(--ulib-color-warning) / <alpha-value>)",
        danger: "rgb(var(--ulib-color-danger) / <alpha-value>)"
      },
      boxShadow: {
        panel: "0 22px 45px -30px rgba(88, 64, 42, 0.35), 0 12px 24px -18px rgba(120, 91, 63, 0.2)",
        field: "0 1px 0 rgba(255, 255, 255, 0.65) inset, 0 16px 30px -24px rgba(87, 63, 39, 0.36)"
      },
      keyframes: {
        "overlay-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "overlay-out": {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        "dialog-in": {
          from: { opacity: "0", transform: "translate(-50%, calc(-50% + 12px)) scale(0.985)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" }
        },
        "dialog-out": {
          from: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          to: { opacity: "0", transform: "translate(-50%, calc(-50% + 8px)) scale(0.99)" }
        },
        "float-in": {
          from: { opacity: "0", transform: "translateY(6px) scale(0.985)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "float-out": {
          from: { opacity: "1", transform: "translateY(0) scale(1)" },
          to: { opacity: "0", transform: "translateY(4px) scale(0.99)" }
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(16px) scale(0.985)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "toast-out": {
          from: { opacity: "1", transform: "translateY(0) scale(1)" },
          to: { opacity: "0", transform: "translateY(12px) scale(0.985)" }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "sheet-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" }
        },
        "sheet-out-right": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(20px)" }
        },
        "sheet-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" }
        },
        "sheet-out-left": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-20px)" }
        },
        "sheet-in-top": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "sheet-out-top": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-20px)" }
        },
        "sheet-in-bottom": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "sheet-out-bottom": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(20px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      },
      animation: {
        "overlay-in": "overlay-in 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        "overlay-out": "overlay-out 160ms ease-in",
        "dialog-in": "dialog-in 260ms cubic-bezier(0.16, 1, 0.3, 1)",
        "dialog-out": "dialog-out 180ms ease-in",
        "float-in": "float-in 180ms cubic-bezier(0.16, 1, 0.3, 1)",
        "float-out": "float-out 140ms ease-in",
        "toast-in": "toast-in 240ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-out": "toast-out 180ms ease-in",
        "accordion-down": "accordion-down 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 180ms ease-in",
        "sheet-in-right": "sheet-in-right 260ms cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-out-right": "sheet-out-right 180ms ease-in",
        "sheet-in-left": "sheet-in-left 260ms cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-out-left": "sheet-out-left 180ms ease-in",
        "sheet-in-top": "sheet-in-top 240ms cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-out-top": "sheet-out-top 180ms ease-in",
        "sheet-in-bottom": "sheet-in-bottom 240ms cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-out-bottom": "sheet-out-bottom 180ms ease-in",
        shimmer: "shimmer 1.8s ease-in-out infinite"
      },
      fontFamily: {
        serif: ["var(--ulib-font-serif)", "Georgia", "serif"],
        sans: ["var(--ulib-font-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        elegant: "0.015em"
      }
    }
  }
};
