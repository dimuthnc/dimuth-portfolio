import type { Config } from "tailwindcss";

/**
 * Tailwind is used for layout only (grid, flex, spacing). Every colour, font,
 * radius and duration below resolves to a factory-ui token in theme/tokens.css,
 * so the whole site re-themes from that one file.
 *
 * Note: token colours are full colour values (hex / rgba), not channel triplets,
 * so Tailwind opacity modifiers (`bg-base/80`) do not apply. Use the wash/edge
 * tokens instead.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- factory-ui tokens ------------------------------------------
        base: { DEFAULT: "var(--fx-bg)", deep: "var(--fx-bg-deep)" },
        surface: { DEFAULT: "var(--fx-surface)", raised: "var(--fx-surface-raised)" },
        rule: { DEFAULT: "var(--fx-rule)", strong: "var(--fx-rule-strong)" },
        ink: { DEFAULT: "var(--fx-ink)", dim: "var(--fx-ink-dim)", faint: "var(--fx-ink-faint)" },
        human: { DEFAULT: "var(--fx-human)", wash: "var(--fx-human-wash)", edge: "var(--fx-human-edge)" },
        machine: { DEFAULT: "var(--fx-machine)", wash: "var(--fx-machine-wash)", edge: "var(--fx-machine-edge)" },
        thought: { DEFAULT: "var(--fx-thought)", wash: "var(--fx-thought-wash)", edge: "var(--fx-thought-edge)" },
        signal: { DEFAULT: "var(--fx-signal)", wash: "var(--fx-signal-wash)", edge: "var(--fx-signal-edge)" },

        // --- shadcn/ui compatibility aliases ----------------------------
        // Kept so any component added via `npx shadcn add` picks up the
        // theme without edits. Prefer the token names above in new code.
        background: "var(--fx-bg)",
        foreground: "var(--fx-ink)",
        border: "var(--fx-rule)",
        input: "var(--fx-rule-strong)",
        ring: "var(--fx-machine)",
        card: { DEFAULT: "var(--fx-surface)", foreground: "var(--fx-ink)" },
        popover: { DEFAULT: "var(--fx-bg-deep)", foreground: "var(--fx-ink)" },
        muted: { DEFAULT: "var(--fx-surface)", foreground: "var(--fx-ink-dim)" },
        accent: { DEFAULT: "var(--fx-surface-raised)", foreground: "var(--fx-ink)" },
        primary: { DEFAULT: "var(--fx-machine)", foreground: "var(--fx-bg-deep)" },
        secondary: { DEFAULT: "var(--fx-surface-raised)", foreground: "var(--fx-ink)" },
        destructive: { DEFAULT: "var(--fx-signal)", foreground: "var(--fx-bg-deep)" },
      },
      fontFamily: {
        display: "var(--fx-font-display)",
        body: "var(--fx-font-body)",
        mono: "var(--fx-font-mono)",
        quote: "var(--fx-font-quote)",
      },
      fontSize: {
        micro: "var(--fx-text-micro)",
        small: "var(--fx-text-small)",
        body: "var(--fx-text-body)",
        lead: "var(--fx-text-lead)",
        title: "var(--fx-text-title)",
        display: "var(--fx-text-display)",
        figure: "var(--fx-text-figure)",
      },
      letterSpacing: {
        label: "var(--fx-track-label)",
        tight: "var(--fx-track-tight)",
      },
      lineHeight: {
        tight: "var(--fx-leading-tight)",
        body: "var(--fx-leading-body)",
      },
      borderRadius: {
        sm: "var(--fx-radius-sm)",
        DEFAULT: "var(--fx-radius)",
        md: "var(--fx-radius)",
        lg: "var(--fx-radius)",
        pill: "var(--fx-radius-pill)",
      },
      borderWidth: {
        bar: "var(--fx-bar)",
      },
      maxWidth: {
        measure: "var(--fx-measure)",
        shell: "68rem",
        "shell-narrow": "46rem",
      },
      transitionTimingFunction: {
        fx: "var(--fx-ease)",
      },
      transitionDuration: {
        fast: "var(--fx-fast)",
        slow: "var(--fx-slow)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
