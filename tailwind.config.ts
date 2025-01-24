import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { xs: "1rem" },
    },
    extend: {
      screens: {
        xs: "320px",
        sm: "414px",
        md: "540px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1280px",
        "3xl": "1536px",
      },
      colors: {
        background: "var(--bg-color)",
        foreground: "var(--foreground)",
        screen: "var(--screen-color)",
        surface: {
          DEFAULT: "var(--surface-color)",
          secondary: "var(--surface-color-secondary)",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
        },
        text: {
          DEFAULT: "var(--text-color-primary)",
          secondary: "var(--text-color-secondary)",
          disabled: "var(--text-color-disabled)",
        },
        error: "var(--error-color)",
        // TODO: Добавить error, success
      },
    },
  },
  plugins: [],
} satisfies Config;
