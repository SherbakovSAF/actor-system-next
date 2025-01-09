import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        foreground: "var(--foreground)",
        screen: "var(--screen-color)",
        surface: {
          DEFAULT: "var(--surface-color)",
          secondary: "var(--surface-color-secondary)",
        },
        // bgAccent: "var(--bg-accent-color)",
        // accent: "var(--accent-color)",
        // textPrimary: "var(--text-color-primary)",
        // textSecondary: "var(--text-color-secondary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
