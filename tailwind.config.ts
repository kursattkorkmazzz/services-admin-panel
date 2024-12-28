import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "snow",
        foreground: "#1A1A1D",
        primary: "#213555",
        secondary: "#3E5879",
        accent: "#F72C5B",
      },
    },
  },
  plugins: [],
} satisfies Config;
