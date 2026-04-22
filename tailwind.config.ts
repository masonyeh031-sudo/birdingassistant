import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          50: "#f7f5ef",
          100: "#ece7dc",
          200: "#d9cfbf",
          300: "#bfb19a",
          400: "#a18f76",
          500: "#83715d",
          600: "#6a5b4b",
          700: "#56493c",
          800: "#44392f",
          900: "#342b24",
        },
        sand: "#f4ede2",
        sky: "#dbe8ec",
        pine: "#2a4a46",
      },
      boxShadow: {
        card: "0 18px 44px rgba(63, 57, 49, 0.10)",
      },
      fontFamily: {
        sans: [
          "\"Hiragino Maru Gothic ProN\"",
          "\"Arial Rounded MT Bold\"",
          "\"SF Pro Rounded\"",
          "\"Noto Sans TC\"",
          "\"PingFang TC\"",
          "\"Microsoft JhengHei\"",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "\"Hiragino Maru Gothic ProN\"",
          "\"Arial Rounded MT Bold\"",
          "\"SF Pro Rounded\"",
          "\"Noto Sans TC\"",
          "\"PingFang TC\"",
          "\"Microsoft JhengHei\"",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(219,232,236,0.95), rgba(247,245,239,0.35) 42%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
