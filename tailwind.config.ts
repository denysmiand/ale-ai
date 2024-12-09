import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 var(--foreground)",
        md: "0 4px 6px -1px var(--foreground), 0 2px 4px -2px var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
